const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config');
const axios = require('axios')

const botOwner = require('../index.js').botOwner
const localBotLogs = '509833053171089428';

const comStatus = {
	"help": "true",
}
client.login(config.token);
const streamerName = 'itsjusttriz'
const embedColor = '#5832a8'

let cooldown = {};

function isOnCooldown(channel, command) {
    if (cooldown[channel] && cooldown[channel][command] == true) return true;
    else return false;
}

function setCooldown(channel, command, cd = 5) {
    if (!cooldown[channel]) cooldown[channel] = {};
    cooldown[channel][command] = true;
    setTimeout(function unsetCooldown() {
        cooldown[channel][command] = false;
    }, cd * 1000);
}

async function simLive(response, message) {
    axios({
    	method: 'get',
        url: `https://api.twitch.tv/helix/streams?user_login=${streamerName}`,
        headers: {
            'Client-ID': `${config.client_id}`,
            'Authorization': `Bearer ${config.authorization}`
    	}
	})
    .then(function (response) {
        /*
        ${response.data.data[0].user_name}
        ${response.data.data[0].game_id}
        ${response.data.data[0].type}
        ${response.data.data[0].title}
        ${response.data.data[0].thumbnail_url}
        */
        if (response.data.data.length > 0 && response.data.data[0].type === 'live') {
            let streamInfo = response.data.data[0]
            axios({
                method: 'get',
                url: `https://api.twitch.tv/helix/games?id=${streamInfo.game_id}`,
                headers: {
                    'Client-ID': `${config.client_id}`,
                    'Authorization': `Bearer ${config.authorization}`
                }
            })
            .then(function (response, command) {
                let streamGame = response.data.data[0].name
                let liveEmbed = new Discord.MessageEmbed()
                .setTitle(':bell: Twitch Live Stream Notification :bell:')
                .setColor(embedColor)
                .addField('Channel', streamInfo.user_name)
                .addField('Stream Title', streamInfo.title)
                .addField('Stream Game', streamGame)
                .addField('Link', `[Click to watch](https://twitch.tv/${streamInfo.user_name})`)
                .setImage(streamInfo.thumbnail_url.replace('{width}x{height}', '1920x1080'))
				.setTimestamp()
                client.channels.fetch('748288027322875976').then(channel => {
                    channel.messages.fetch('770312500951908432').then(message => {
                        message.edit(liveEmbed)
                    })
                    if (isOnCooldown(channel, command)) return;
                    else {
                        setCooldown(channel, command, 60 * 60 * 8)
                        channel.send(`<@&770107042182332426>`).then(msg => msg.delete({timeout: 1000 * 5}));
                    }
                });
            })
        } else {
            client.channels.fetch('748288027322875976').then(channel => {
                channel.messages.fetch('770312500951908432').then(message => {
                    let offlineEmbed = new Discord.MessageEmbed()
                    .setTitle(':bell: Twitch Live Stream Notification :bell:')
                    .setColor(embedColor)
                    .setDescription(`:x: ${streamerName} is offline.\n\nKeep an eye on this channel to know when ${streamerName} is live!`)
					.setTimestamp()
                    message.edit(offlineEmbed)
                })
            });
        }
    })
    .catch(function (error) {
        console.log('ERROR:', error);
    });
}

let simLiveBool = true
setInterval(function simLiveInterval(message) {
    if (simLiveBool == true) {
        simLive()
    } else return;
}, 1000 * 60 * 5);

function handleMessage(client, message, response) {
	let args = message.content.split(' ');
	let command = args.shift().toLowerCase();
	const { guild } = message
	const { name, region, memberCount, owner, afkTimeout } = guild
	const icon = guild.iconURL()

    if (message.content.startsWith('?simlive')) {
        if (message.author.id !== botOwner && message.author.id !== '159985870458322944') return;
        simLive(response, message)
    }

	switch(command) {
		case '?help':
			if (comStatus.help !== 'true') return;
			const helpembed = new Discord.MessageEmbed()
				.setTitle('Server Specific Command Help')
				.setAuthor(message.author.username, message.author.displayAvatarURL())
				.setFooter("Guild: " + guild.name)
				.setTimestamp()
				.setColor(embedColor)
				.setDescription('<@!228167686293553164> is currently learning DiscordJS.\n There\'s only a couple commands available below at this current time.')
				.addField('\`?help\`', 'Retrieves this embed response.')
				.addField(`\`?pokedodie\``, `Sends a heartwarming DM to <@!419996490170105869> (*${owner.user.username} ONLY*)`)
				.addField('\`?simlive\`', `Example Stream Embed (*${owner.user.username} ONLY*)`)
				.addField('\`?grabtoken\`', `Grabs a token (*${owner.user.username} ONLY*)`)
				.addField('\`?setpresence\`', `Changes CMCB status msg (*${owner.user.username} ONLY*)`)
				.addField('\`?maintenance\`', `Enables Maintenance mode (*${owner.user.username} ONLY*)`)
				.addField('\`?kill\`', `Kills the bot (*${owner.user.username} ONLY*)`)
				.addField('\`?invite\`', `Invites the bot to a server (*${owner.user.username} ONLY*)`)
			message.author.send(helpembed)
			break;
		case '?pokedodie':
			if (message.author.id !== botOwner) return;
			let pokedodieid = message.guild.members.cache.get('419996490170105869');
				const pokedodieembed = new Discord.MessageEmbed()
					.setTitle('Hi, Dodie!')
					.setColor(embedColor)
					.setThumbnail(pokedodieid.iconURL)
					.setDescription('Triz says he loves you. You\'ll figure it out! <3')
				pokedodieid.send(pokedodieembed)
			break;
		case '?invite':
			if (message.author.id !== botOwner) return;
				let inviteembed = new Discord.MessageEmbed()
					.setTitle(`Invite Nottriz CMCB`)
					.setDescription('Click [Here](https://discord.com/api/oauth2/authorize?client_id=763135917329743903&permissions=499641462&scope=bot) to Invite Bot to Your server!')
					.setAuthor(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL())
					.setTimestamp()
				message.channel.send(inviteembed)
		case '?grabtoken':
			if (message.author.id !== botOwner) return;
			axios({
				method: 'post',
				url: 'https://id.twitch.tv/oauth2/token?grant_type=client_credentials&client_id=b6srnhniwzook05hda43c1p73l0p9s&client_secret=g3g1hzbc9rnh4z4rjb7faj40aegs3o&redirect_uri=g3g1hzbc9rnh4z4rjb7faj40aegs3o&response_type=token'
			})
			.then(function (response) {
				console.log('RESPONSE:', response)
			})
			.catch(function (error) {
				console.log('ERROR:', error)
			})
			break;
		case '?setpresence':
			if (message.author.id !== botOwner) return;
			if (!args[0]) return;
			else {
				client.user.setPresence({
					activity: {
						name: args[0],
						type: 0
					}
				});
			}
			break;
		case '?maintenance':
			var presenceStatus = require('../index.js').presenceStatus
			if (message.author.id !== botOwner) return;
			if (!args[0]) {
				message.channel.send(`[ERROR] <@!${message.author.id}> - Please specify between \'true\' or \'false\'`)
			} else if (args[0] == 'true') {
				presenceStatus = true
				client.user.setPresence({
					activity: {
						name: '[Under Maintenance]',
						type: 0
					}
				});
			} else if (args[0] == 'false') {
				presenceStatus = false
				client.user.setPresence({
					activity: {
						name: 'Use ?help',
						type: 0
					}
				});
			}
			break;
		case '?kill':
			if (message.author.id !== botOwner) return;
				process.exit(0);
			break;
	}
}

function handleGuildMemberUpdate(oldMember, newMember) {
	let channel = newMember.guild.channels.cache.get('763918843021492265')
	// If the role(s) are present on the old member object but no longer on the new one (i.e role(s) were removed)
	const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
	if (removedRoles.size > 0) {
		console.log(`The roles ${removedRoles.map(r => r.name)} were removed from ${oldMember.displayName} in ${oldMember.guild.name}.`);
		let removedRolesEmbed = new Discord.MessageEmbed()
			.setAuthor(`${oldMember.user.tag}`, oldMember.user.displayAvatarURL())
			.addField(":no_entry: Removed Role", `${removedRoles.map(r => r.name)}`)
			.setColor(embedColor)
			.setFooter(`UserID: ${oldMember.id}`)
			.setTimestamp()	
		channel.send(removedRolesEmbed)
	}
	// If the role(s) are present on the new member object but are not on the old one (i.e role(s) were added)
	const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
	if (addedRoles.size > 0) {
		console.log(`The roles ${addedRoles.map(r => r.name)} were added to ${oldMember.displayName} in ${oldMember.guild.name}.`);
		let addedRolesEmbed = new Discord.MessageEmbed()
			.setAuthor(`${oldMember.user.tag}`, oldMember.user.displayAvatarURL())
			.addField(":white_check_mark: Added Role", `${addedRoles.map(r => r.name)}`)
			.setColor(embedColor)
			.setFooter(`UserID: ${oldMember.id}`)
			.setTimestamp()
		channel.send(addedRolesEmbed)
	}
}

async function handleGuildMemberAdd(member) {
	let memberJoinEmbed = new Discord.MessageEmbed()
		.setColor('#42f572')
		.addField('Action', '<:joinServer:770829534793826314> Member Joined', false)
		.addField('Username', member.user.username, true)
		.addField('ID', member.user.id, false)
		.addField('Bot?', member.user.bot, true)
		.addField('Discriminator', member.user.discriminator, true)
		.setThumbnail(member.user.displayAvatarURL())
		.setTimestamp()
	await client.channels.fetch('482301995408162817').then(channel => {
		channel.send(memberJoinEmbed)
	})
}

async function handleGuildMemberRemove(member) {
	let memberLeaveEmbed = new Discord.MessageEmbed()
	.setColor('#42f572')
	.addField('Action', '<:leaveServer:770829554059182090> Member Left', false)
	.addField('Username', member.user.username, true)
	.addField('ID', member.user.id, false)
	.addField('Bot?', member.user.bot, true)
	.addField('Discriminator', member.user.discriminator, true)
	.setThumbnail(member.user.displayAvatarURL())
	.setTimestamp()
	await client.channels.fetch('482301995408162817').then(channel => {
		channel.send(memberLeaveEmbed)
	})
}

module.exports.handleMessage = handleMessage
module.exports.handleGuildMemberUpdate = handleGuildMemberUpdate
module.exports.handleGuildMemberAdd = handleGuildMemberAdd
module.exports.handleGuildMemberRemove = handleGuildMemberRemove

