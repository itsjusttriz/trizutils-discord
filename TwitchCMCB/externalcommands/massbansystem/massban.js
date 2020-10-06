// This is used to allow for a single file to work for everyone. No editing of the file itself.
require('dotenv').config({ path: './externalcommands/massbansystem/user.env' });

// Check to make sure all the user.env settings are set, best we can.
let update_env = false;
if (process.env.TWITCH_USERNAME == 'your_username') {
	console.log('Update your user.env and provide a USERNAME.');
	update_env = true;
}
if (process.env.TWITCH_OAUTH == 'oauth:your_oauth_code') {
	console.log('Update your user.env and provide an OAUTH.');
	update_env = true;
} else if (!process.env.TWITCH_OAUTH.startsWith('oauth:')) {
	console.log('Update your user.env and provide an OAUTH starting with oauth:');
	update_env = true;
}
if (process.env.TWITCH_API_OAUTH == 'Bearer your_oauth_code') {
	console.log('Update your user.env and provide an API_OAUTH.');
	update_env = true;
} else if (!process.env.TWITCH_API_OAUTH.startsWith('Bearer')) {
	console.log('Update your user.env and provide an API_OAUTH starting with Bearer ');
	update_env = true;
}
if (process.env.TWITCH_USER_ID.startsWith('Get')) {
	console.log('Update your user.env and provide a USER_ID.');
	update_env = true;
} if (!Number(process.env.TWITCH_USER_ID)) {
	console.log('Update your user.env and ensure your USER_ID is correct and has no spaces.')
	update_env = true;
}
if (update_env) process.exit(1);

const sql = require('./sql.js');
const getUrls = require('get-urls');
const request = require('request');
const twitchjs = require('twitch-js');
const CLIENT_OPTIONS = {
	options: { debug: process.env.TWITCH_OUTPUT_CHAT == 'false' ? true : false },
	connection: { reconnect: true, secure: true },
	identity: { username: process.env.TWITCH_USERNAME, password: process.env.TWITCH_OAUTH },
	channels: [process.env.TWITCH_USERNAME]
};
let client = require('../../config.js').client;

// Correct usage of commands.
const CORRECT_USAGE = {
	MASSBAN: '!massban username reason with proof link (channel)',
	ADDPROOF: '!addproof username proof links space separated'
};

// Channels to ban in. Will be populated by either mod lookup or SQL.
let ban_channels = [process.env.TWITCH_USERNAME];
// Channels not to ban in. Will be populated by SQL.
let ignore_channels = [];
// User IDs of people able to operate the bot. Will be populated by SQL.
let allowed_users = [process.env.TWITCH_USER_ID];
// Opt-In? Will be populated by SQL;
let opt_in = null;


// Time to actually start the bot. Grab all the data needed from the database and populate the required variables first.
sql.getStartupVariables(process.env.TWITCH_USER_ID).then((data) => {
	// On first startup, force opt-in so setting can be applied without accidental banning.
	opt_in = data.opt_in;
	// Add all allowed user-ids to the list.
	data.allowed_users.forEach((user_id) => {
		allowed_users.push(user_id);
	});
	// Add all channels to ignore in opt-out mode.
	getNamesFromIDs(data.ignore_channels).then((names) => {
		ignore_channels = names;
	});
	// If in opt-in mode, set the channels to ban in.
	if (opt_in)	{
		getNamesFromIDs(data.ban_channels).then((names) => {
			ban_channels = names;
		});
	// Otherwise, grab the list from modlookup and ignore needed channels.
	} else {
		request('https://modlookup.3v.fi/api/user-v3/' + process.env.TWITCH_USERNAME, (err, res, body) => {
			try {
				let obj = JSON.parse(body);
				obj.channels.forEach(channel => {
					if (ignore_channels.indexOf(channel.name) === -1 && ban_channels.indexOf(channel.name) === -1) ban_channels.push(channel.name);
				});
			} catch (e) {
				console.log('Getting mod list failed: ' + e);
				process.exit(1);
			}
		});

		// Every 12 hours, refresh the list.
		setInterval(function get_modded_channels() {
			request('https://modlookup.3v.fi/api/user-v3/' + process.env.TWITCH_USERNAME, (err, res, body) => {
				try {
					let obj = JSON.parse(body);
					obj.channels.forEach(channel => {
						if (ignore_channels.indexOf(channel.name) === -1 && ban_channels.indexOf(channel.name) === -1) ban_channels.push(channel.name);
					});
				} catch (e) {
					console.log('Getting mod list failed: ' + e);
				}
			});
		}, 12 *60*60*1000 /* 12 hours */);
	}
	// Join all the channels saved in the database to join.
	getNamesFromIDs(data.join_channels).then(names => {
		names.forEach((channel, n) => {
			setTimeout(() => {
				client.join(channel);
			}, n*3000);
		});
	});


	// Once everything is set up, connect to Twitch.

	// Print in console when connected.
	client.on('connected', (address, port) => {
		console.log('Connected to Twitch.');
	});

	// Read chat messages.
	client.on('chat', (channel, userstate, message, self) => {
		// If the bot is running the command (which it never should), ignore it.
		if (self) return;
		// If it's not someone who can ban, we don't need to worry about the message.
		if (allowed_users.indexOf(userstate['user-id']) !== -1) {
			// Split the message so we can extract the parts we need to store and format nicely.
			let split_msg = message.split(' ');
			switch (split_msg[0]) {
				// Check the first word for the different commands.
				case '!massban':
				// If there is no reason, no proof, and no channel, don't even attempt to ban.
					if (split_msg.length <= 2) {
						client.whisper(userstate.username, 'Correct usage: ' + CORRECT_USAGE.MASSBAN);
						return;
					}
					// Remove !massban from the array.
					split_msg.shift();
					// Extract the user being banned.
					let user_being_banned = split_msg.shift();
					// Extract URLs.  If none is given, assume none is needed. Instances of this would be a racist name or similar self-evident reason.
					let proof = Array.from(getUrls(message, { normalizeProtocol: false, stripFragment: false, stripWWW: false, removeTrailingSlash: false, sortQueryParameters: false })) || [];
					// If "proof" is used in any form, remove it.
					if (message.match(/proof/gi)) {
						split_msg = removeFromArrayIgnoreCase(split_msg, 'proof');
					}
					// Extract the original channel. If non is given, assume the channel the command is ran from.
					let match = message.match(/\(\w+\)/g);
					let original_channel = match ? match[0] : channel.substr(1);
					// Remove proof link and original channel, leaving only a ban messagee.
					proof.forEach((link) => {
						split_msg = removeFromArray(split_msg, link);
					});
					split_msg = removeFromArray(split_msg, original_channel);
					// For each channel the bot is banning in, ban the user. 1 second delay between bans to prevent DC issues.
					ban_channels.forEach((chan, n) => {
						setTimeout(function ban() {
							client.ban(chan, user_being_banned, `Banned by: ${userstate.username} - ${split_msg.join(' ')}${proof.length == 0 ? ' ' : ' Proof: ' + proof.join(' & ')} (${original_channel.replace(/[\(\)]/g, '')}) ${process.env.TWITCH_BAN_ADDON}`).then((data) => {
								console.log(`Successfully banned ${data[1]} in ${data[0].substr(1)}.`);
							}).catch((err) => {
								switch (err) {
									case 'already_banned':
									case 'bad_ban_admin':
									case 'bad_ban_broadcaster':
									case 'bad_ban_global_mod':
									case 'bad_ban_self':
									case 'bad_ban_staff':
									case 'usage_ban':
										break;
									case 'no_permission':
										console.log(`Attempted to ban ${user_being_banned} in ${chan} but the bot appears to not be moderator. Attempting again in 60 seconds.`);
										setTimeout(function reBanNoMod() {
											client.ban(chan, user_being_banned, `Banned by: ${userstate.username} - ${split_msg.join(' ')}${proof.length == 0 ? ' ' : ' Proof: ' + proof.join(' & ')} (${original_channel.replace(/[\(\)]/g, '')}) ${process.env.TWITCH_BAN_ADDON}`).then((data) => {
												console.log(`Successfully banned ${data[1]} in ${data[0].substr(1)}.`);
											}).catch((err) => {
												console.log(`Failed to ban ${user_being_banned} in ${chan} a second time.`);
											});
										}, 60000);
										break;
									default:
										console.log(`Attempted to ban ${user_being_banned} in ${chan} but the request timed out. Attempting again in 60 seconds.`);
										setTimeout(function reBanTimeout() {
											client.ban(chan, user_being_banned, `Banned by: ${userstate.username} - ${split_msg.join(' ')}${proof.length == 0 ? ' ' : ' Proof: ' + proof.join(' & ')} (${original_channel.replace(/[\(\)]/g, '')}) ${process.env.TWITCH_BAN_ADDON}`).then((data) => {
												console.log(`Successfully banned ${data[1]} in ${data[0].substr(1)}.`);
											}).catch((err) => {
												console.log(`Failed to ban ${user_being_banned} in ${chan} a second time.`);
											});
										}, 60000);
										break;
								}
							});
						}, n * 3000);
					});
					// Message the MassBanBot channel for a written log of events.
					client.say('#massbanbot', `${user_being_banned} banned by ${userstate.username}. Reason: ${split_msg.join(' ')}${proof.length == 0 ? ' ' : ' Proof: ' + proof.join(' & ')} (${original_channel.replace(/[\(\)\s]/g, '')})`);
					// Add the ban to the database.
					sql.addBan(channel.substr(1), userstate.username, user_being_banned.toLowerCase(), split_msg.join(' '), proof.join(' & '), original_channel.replace(/[\(\)\s]/g, ''));
					break;
				case '!addproof':
					// If there is nothing after the name, there is no proof to add.
					if (split_msg.length <= 2) {
						client.whisper(userstate.username, 'Correct usage: ' + CORRECT_USAGE.ADDPROOF);
						return;
					}
					// Remove !addproof from the array.
					split_msg.shift();
					// Extract the user to add proof to.
					let user_adding_to = split_msg.shift();
					// Add the proof.
					sql.addProof(user_adding_to.toLowerCase(), split_msg.join(' ') + ' ').then(() => client.say(channel, 'Proof added.')).catch(e => { if (e == null) client.say(channel, 'That user has not been banned, make sure you typed it correctly.'); else client.say(channel, 'Error adding proof. Check console.') });
					break;
				case '!mbadmin':
					// If it's not the same account as the bot, ignore the command.
					if (userstate['user-id'] != process.env.TWITCH_USER_ID) return;
					// If the first argument is help, reply with the available commands.
					if (split_msg.length <= 2 || split_msg[1] == 'help') {
						client.say(channel, 'Command usage can be found here: http://47y.link/massban-commands');
					} else {
						// If at any point a command fails, this will be true and we can post in chat that it failed.
						let failed = false;
						switch (split_msg[1]) {
							case 'optin':
								let arg = split_msg[2];
								// Make sure the setting is being set to true or false.
								if (arg.toLowerCase() == 'true' || arg.toLowerCase() == 'false') {
									// Set the opt-in value in the database.
									sql.setOptIn(process.env.TWITCH_USER_ID, arg.toLowerCase() == 'true' ? true : false);
									// If false, grab the modded list from the API.
									// Otherwise, grab the ban list from the database.
									if (arg.toLowerCase() == 'false') {
										request('https://modlookup.3v.fi/api/user-v3/' + process.env.TWITCH_USERNAME, (err, res, body) => {
											try {
												let obj = JSON.parse(body);
												ban_channels.push(process.env.TWITCH_USERNAME);
												obj.channels.forEach(chan => {
													if (ignore_channels.indexOf(chan.name) === -1 && ban_channels.indexOf(chan.name) === -1) ban_channels.push(chan.name);
												});
											} catch (e) {
												console.log('Getting mod list failed: ' + e);
												process.exit(1);
											}
										});
										client.say(channel, 'Opt-in disabled.');
									} else {
										sql.getBanChannels(process.env.TWITCH_USER_ID).then(data => {
											getNamesFromIDs(data).then(names => ban_channels = names);
										});
										client.say(channel, 'Opt-in enabled.');
									}
								} else client.say(channel, 'Command usage can be found here: http://47y.link/massban-commands');
								break;
							case 'join':
								for (let i = 2; i < split_msg.length; i++) {
									getIDFromName(split_msg[i]).then(id => {
										setTimeout(function joinNewChannels() {
											sql.addJoinChannel(process.env.TWITCH_USER_ID, id).catch(e => failed = true);
											client.join(split_msg[i]);
										}, (i-2) * 1000);
									});
								}
								if (split_msg.length > 4) client.say(channel, 'Started processing command.');
								setTimeout(function checkFailed() {
									if (failed) client.say(channel, 'Failed to join channels.');
									else client.say(channel, 'Joined all channels.');
								}, split_msg.length * 1000);
								break;
							case 'leave':
								for (let i = 2; i < split_msg.length; i++) {
									getIDFromName(split_msg[i]).then(id => {
										setTimeout(function leaveChannels() {
											sql.removeJoinChannel(process.env.TWITCH_USER_ID, id).catch(e => failed = true);
											client.part(split_msg[i]);
										}, (i-2) * 1000);
									});
								}
								if (split_msg.length > 4) client.say(channel, 'Started processing command.');
								setTimeout(function checkFailed() {
									if (failed) client.say(channel, 'Failed to leave channels.');
									else client.say(channel, 'Left all channels.');
								}, split_msg.length * 1000);
								break;
							case 'add':
								for (let i = 2; i < split_msg.length; i++) {
									getIDFromName(split_msg[i]).then(id => setTimeout(function addBanChannels() { sql.addBanChannel(process.env.TWITCH_USER_ID, id).catch(e => failed = true)}, (i-2) * 1000));
									ban_channels.push(split_msg[i].toLowerCase());
								}
								if (split_msg.length > 4) client.say(channel, 'Started processing command.');
								setTimeout(function checkFailed() {
									if (failed) client.say(channel, 'Failed to add channels.');
									else client.say(channel, 'Added all channels.');
								}, split_msg.length * 1000);
								break;
							case 'remove':
								for (let i = 2; i < split_msg.length; i++) {
									getIDFromName(split_msg[i]).then(id => setTimeout(function removeBanChannels() { sql.removeBanChannel(process.env.TWITCH_USER_ID, id).catch(e => failed = true)}, (i-2) * 1000));
									ban_channels = removeFromArray(ban_channels, split_msg[i].toLowerCase());
								}
								if (split_msg.length > 4) client.say(channel, 'Started processing command.');
								setTimeout(function checkFailed() {
									if (failed) client.say(channel, 'Failed to remove channels.');
									else client.say(channel, 'Removed all channels.');
								}, split_msg.length * 1000);
								break;
							case 'allow':
								for (let i = 2; i < split_msg.length; i++) {
									getIDFromName(split_msg[i]).then(id => {
										setTimeout(function addAllowedUsers() { sql.addAllowedUser(process.env.TWITCH_USER_ID, id).catch(e => failed = true)}, (i-2) * 1000);
										allowed_users.push(id);
									});
								}
								if (split_msg.length > 4) client.say(channel, 'Started processing command.');
								setTimeout(function checkFailed() {
									if (failed) client.say(channel, 'Failed to allow users.');
									else client.say(channel, 'Allowed all users.');
								}, split_msg.length * 1000);
								break;
							case 'disallow':
								for (let i = 2; i < split_msg.length; i++) {
									getIDFromName(split_msg[i]).then(id => {
										setTimeout(function removeAllowedUsers() { sql.removeAllowedUser(process.env.TWITCH_USER_ID, id).catch(e => failed = true)}, (i-2) * 1000);
										allowed_users = removeFromArray(allowed_users, id);
									});
								}
								if (split_msg.length > 4) client.say(channel, 'Started processing command.');
								setTimeout(function checkFailed() {
									if (failed) client.say(channel, 'Failed to disallow users.');
									else client.say(channel, 'Disallowed all users.');
								}, split_msg.length * 1000);
								break;
							case 'ignore':
								for (let i = 2; i < split_msg.length; i++) {
									getIDFromName(split_msg[i]).then(id => setTimeout(function addIgnoredChannels() { sql.addIgnoreChannel(process.env.TWITCH_USER_ID, id).catch(e => failed = true)}, (i-2) * 1000));
									ignore_channels.push(split_msg[i].toLowerCase());
									ban_channels = removeFromArray(ban_channels, split_msg[i].toLowerCase());
								}
								if (split_msg.length > 4) client.say(channel, 'Started processing command.');
								setTimeout(function checkFailed() {
									if (failed) client.say(channel, 'Failed to ignore channels.');
									else client.say(channel, 'Ignored all channels.');
								}, split_msg.length * 1000);
								break;
							case 'unignore':
								for (let i = 2; i < split_msg.length; i++) {
									getIDFromName(split_msg[i]).then(id => setTimeout(function removeIgnoredChannels() { sql.removeIgnoreChannel(process.env.TWITCH_USER_ID, id).catch(e => failed = true)}, (i-2) * 1000));
									ignore_channels = removeFromArray(ignore_channels, split_msg[i].toLowerCase());
								}
								if (split_msg.length > 4) client.say(channel, 'Started processing command.');
								setTimeout(function checkFailed() {
									if (failed) client.say(channel, 'Failed to unignore channels.');
									else client.say(channel, 'Unignored all channels.');
								}, split_msg.length * 1000);
								break;
							case 'list':
								if (split_msg.length < 3) {
									client.say(channel, `Please specify what to list. For example, !mbadmin list allowed`);
									return;
								}
								switch (split_msg[2]) {
									case 'joined':
									case 'join':
										client.say(channel, `Joined channels: ${client.getChannels().join(', ')}`);
										break;
									case 'added':
									case 'add':
										client.say(channel, `Added channels: ${ban_channels.join(', ')}`);
										break;
									case 'allowed':
									case 'allow':
										getNamesFromIDs(allowed_users).then((names) => {
											client.say(channel, `Allowed users: ${names.join(', ')}`);
										});
										break;
									case 'ignored':
									case 'ignore':
										client.say(channel, `Ignored channels: ${ignore_channels.join(', ')}`);
										break;
									default:
										client.say(channel, `Available options to list: allowed, added, joined, ignored.`);
										break;
								}
								break;
							default:
								client.say(channel, 'Command usage can be found here: http://47y.link/massban-commands');
								break;
						}
					}
			}
		}
	});
});


// Function that allows us to easily remove a value from an array by giving the array and the value.
function removeFromArray(arr, to_remove) {
	return arr.filter((value) => {
       return value != to_remove;
   });
}

function removeFromArrayIgnoreCase(arr, to_remove) {
	let regex = new RegExp(to_remove, 'i')
	return arr.filter((value) => {
       return !value.match(regex);
   });
}

// Get a User ID from a Username.
function getIDFromName(username) {
	return new Promise((resolve, reject) => {
		request({
			url: `https://api.twitch.tv/helix/users?login=${username}`,
			headers: {
				'Client-ID': 'q6batx0epp608isickayubi39itsckt',
				'Authorization': process.env.TWITCH_API_OAUTH
			}
		}, (error, result, body) => {
			if (error) {
				console.log('Error getting ID from username: ' + error);
				reject(null);
			} else {
				let json = JSON.parse(body);
				if (json.data[0]) {
					resolve(json.data[0].id);
				} else {
					reject(null);
				}
			}
		});
	});
}

// Get a list of Usernames from a list of User IDs.
function getNamesFromIDs(ids) {
	return new Promise((resolve, reject) => {
		let names = [];
		if (ids.length == 0) {
			resolve(names);
			return;
		}
		if (ids.length > 100) {
			let done = false;
			for (let i = 0; i < ids.length; i += 100) {
				let temp = ids.slice(i, i+100);
				request({
					url: `https://api.twitch.tv/helix/users?id=${ids.join('&id=')}`,
					headers: {
						'Client-ID': 'q6batx0epp608isickayubi39itsckt',
						'Authorization': process.env.TWITCH_API_OAUTH
					}
				}, (error, result, body) => {
					if (error) {
						console.log('Error getting usernames from IDs: ' + error);
						reject(null);
					} else {
						let json = JSON.parse(body);
						if (json.data[0]) {
							json.data.forEach((user) => {
								names.push(user.login);
							});
						} else {
							reject(null);
						}
					}
				});
			}
			// Make sure all the ids have been converted before resolving.
			while (ids.length > names.length && !done) {
				if (ids.length == names.length) {
					done = true;
					resolve(names);
				}
				await (function sleep() { return new Promise((res) => setTimeout(res, 1000))});
			}
		} else {
			request({
				url: `https://api.twitch.tv/helix/users?id=${ids.join('&id=')}`,
				headers: {
					'Client-ID': 'q6batx0epp608isickayubi39itsckt',
					'Authorization': process.env.TWITCH_API_OAUTH
				}
			}, (error, result, body) => {
				if (error) {
					console.log('Error getting usernames from IDs: ' + error);
					reject(null);
				} else {
					let json = JSON.parse(body);
					if (json.data[0]) {
						json.data.forEach((user) => {
							names.push(user.login);
						});
						resolve(names);
					} else {
						reject(null);
					}
				}
			});
		}
	});
}
