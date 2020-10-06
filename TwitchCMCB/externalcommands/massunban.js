const request = require('request');
const getUrls = require('get-urls');
const client = require('../config.js').client;
const botAdmin = require('../index.js').botAdmin

let modded = [];

client.on('chat', (channel, userstate, message, self) => {
	if (userstate.username == 'itsjusttriz' || userstate.username == 'nottriz' || userstate.username == 'tellik' || userstate.username == 'rhilou32' || userstate.username == '47y_') { // Add new people here.
	// If you want to be safer incase someone changes their name, you can use "parseInt(userstate['user-id']) == 26797038" obviously changing the number to your own/whomever's
		if (message.startsWith('!massunban ')) {
			let proof = getUrls(message, { normalizeProtocol: false, stripFragment: false, stripWWW: false, removeTrailingSlash: false, sortQueryParameters: false });
			let proofLink = '';
			proof.forEach((link) => {
				proofLink = ' ' + link;
			});
			message = message.replace(proofLink, '');
			let reason = message.split(' ');
			reason.shift();
			let user = reason.shift();
			reason = reason.join(' ');
			modded.forEach((channel, n) => {
				setTimeout(function unban() {
					client.unban(channel, user, `${reason}${proofLink != '' ? ' Proof: ' + proofLink : ''} - Contact Triz#4776 on Discord for more info. Banned by: ${userstate.username}`).then(data => {}).catch(err => {});
				}, n * 100);
			});
			client.say('#nottriz', `${user} un-banned by ${userstate.username}. Reason: ${reason}${proofLink != '' ? ' Proof: ' + proofLink : ''}`); // This can be removed if you want. Essentially it's for me to keep track of banned people ¯\_(ツ)_/¯
			//sql.addBan(channel, userstate.username, user.toLowerCase(), reason, proofLink);
		}
	}
});

setTimeout(function get_modded_first_time() {
	request('https://modlookup.3v.fi/api/user-v3/nottriz', (err, res, body) => { // Change this to your username.
		let obj = JSON.parse(body);
		obj.channels.forEach(channel => {
			modded.push(channel.name);
		});
	});
}, 10000);

setInterval(function get_modded_channels() {
	request('https://modlookup.3v.fi/api/user-v3/nottriz', (err, res, body) => {
		try {
			let obj = JSON.parse(body);
			obj.channels.forEach(channel => {
				if (modded.indexOf(channel.name) == -1) modded.push(channel.name);
			});
			console.log(modded);
		} catch (e) {
			console.log('Getting mod list failed: ' + e);
		}
	});
}, 1000 * 60 * 60 * 24 /* 24 hours */ );
