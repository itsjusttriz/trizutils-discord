import * as fs from 'fs';
import chalk from 'chalk';
import { botAdmin } from '../config.js';
import * as $ from '../datapull/defaults.js';

let hearts = '<3';
const filePath = './extcmd/hearts.emotes.txt';

fs.readFile(filePath, (err, data) => {
	try {
		hearts = data.toString();
		console.log(
			'=== Syncing hearts.js ===\n' +
			`${chalk.whiteBright.bold(hearts)}`
		);
	} catch (e) {
		console.log(chalk.red(e));
	}
});

export function onMessage(chatClient, channel, user, message, msg) {
	const newMsg = message;
	message = message.toLowerCase();
	if (message.startsWith('!hearts') || message.startsWith('!heartspam')) {
		if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
		chatClient.say(channel, hearts);
	} else if (message.startsWith('!addheart')) {
		if (user !== 'itsjusttriz' && user !== 'nottriz') return;
		fs.open(filePath, 'a', (err, fd) => {
			try {
				fs.write(fd, ` ${newMsg.substring(10)}`, (err) => {
					if (err) return console.error(err);
					try {
						hearts = `${hearts} ${newMsg.substring(10)}`;
					} catch (e) {
						console.log(chalk.red(e));
					}
				});
			} catch (e) {
				console.log(chalk.red(e));
			}
		});
	} else if (message.startsWith('!delheart')) {
		if (user !== 'itsjusttriz' && user !== 'nottriz') return;
		fs.readFile(filePath, (err, data) => {
			try {
				hearts = data.toString().replace(` ${newMsg.substring(10)}`, '');
				fs.writeFile(filePath, hearts, (err) => {
					if (err) return console.log(err);
				});
			} catch (e) {
				console.log(chalk.red(e));
			}
		});
	} else if (message.startsWith('!reloadhearts')) {
		if (user !== 'itsjusttriz' && user !== 'nottriz') return;
		fs.readFile(filePath, (err, data) => {
			try {
				hearts = data.toString();
			} catch (e) {
				console.log(chalk.red(e));
			}
		});
	}
}