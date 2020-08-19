const client = require('../main.js').client;
const fs = require('fs');
let hearts = '<3';
const botAdmin = require('../main.js').botAdmin

const trizVip = ['dodie2001', 'bowbender', 'domosplace', 'finncapp', 'theimperialbitgod'];

fs.readFile('./externalcommands/hearts.emotes.txt', (err, data) => {
	if (err) console.log(err);
	else hearts = data.toString();
});

client.on('chat', (channel, userstate, message, self) => {
	let msg = message;
	message = message.toLowerCase();
	if (message.startsWith('!heartspam') || message.startsWith('!hearts')) {
		if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0 && trizVip.indexOf(userstate.username) < 0) return;
		client.say(channel, hearts);
	} else if (message.startsWith('!addheart')) {
		if (userstate.username == 'itsjusttriz' || userstate.userstate == 'nottriz') {
			let file = fs.open('./externalcommands/hearts.emotes.txt', 'a', (err, fd) => {
				if (err) console.log(err);
				else {
					fs.write(fd, ` ${msg.substring(10)}`, (err) => {
						if (err) console.log(err);
						hearts = `${hearts} ${msg.substring(10)}`;
					});
				}
			});
		}
	} else if (message.startsWith('!delheart')) {
		if (userstate.username != 'itsjusttriz' && userstate.username != 'nottriz') return;
		fs.readFile('./externalcommands/hearts.emotes.txt', (err, data) => {
			if (err) console.log(err);
			data = data.toString().replace(` ${msg.substring(10)}`, '');
			fs.writeFile('./externalcommands/hearts.emotes.txt', data, (err) => {
				if (err) console.log(err);
				hearts = data;
			});
		});
	} else if (message.startsWith('!reloadhearts')) {
		if (userstate.username != 'itsjusttriz' && userstate.username != 'nottriz') return;
		fs.readFile('./externalcommands/hearts.emotes.txt', (err, data) => {
			if (err) console.log(err);
			else hearts = data.toString();
		});
	}
});
