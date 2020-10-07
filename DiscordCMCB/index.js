const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request-promise');

const config = require('./config.json');

const botOwner = '228167686293553164';
module.exports.botOwner = botOwner

const guildIdList = {
	"itsjusttriz": "466402083466379267",
	"domosplace": "155849052850880513"
}

let presenceStatus = {'maintenance': 0} // 0 for Disabled; 1 for Enabled;


const itsjusttrizGuildFile = require('./guilds/itsjusttriz.js')

client.on('ready', async () => {
	client.channels.fetch('509833053171089428').then(channel => {
		channel.send(`Client loaded under <@!${client.user.id}>`)
		console.log(`Client loaded under <@!${client.user.id}`)
		if (presenceStatus.maintenance === 0) {
			client.user.setPresence({
				activity: {
					name: 'Use ?help',
					type: 0
				}
			})
		} else {
			client.user.setPresence({
				activity: {
					name: '[Under Maintenance]',
					type: 0
				}
			})
		}
	})
})

client.on('message', async (message) => {
	let args = message.content.split(' ');
	let command = args.shift().toLowerCase();
	const { guild } = message
	const { name, region, memberCount, owner, afkTimeout } = guild
	const icon = guild.iconURL()
	const content = message.content.replace(`${command} `, '')

	console.log(`[${guild.name}] {${message.channel.name}} <${message.author.tag}> ${message}`);

	if (message.guild.id === guildIdList.itsjusttriz) {
		itsjusttrizGuildFile.handleMessage(message);
	}

	switch(command) {
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
			if (message.author.id !== botOwner) return;
			if (!args[0]) {
				message.channel.send(`[ERROR] <@!${message.author.id}> - Please specify between \'true\' or \'false\'`)
			} else if (args[0] == 'true') {
				presenceStatus = {'maintenance': 1}
				client.user.setPresence({
					activity: {
						name: '[Under Maintenance]',
						type: 0
					}
				});
			} else if (args[0] == 'false') {
				presenceStatus = {'maintenance': 0}
				client.user.setPresence({
					activity: {
						name: 'Use ?help',
						type: 0
					}
				});
			}
			break;
		case '?math':
			if (!args[0]) {
				message.channel.send(`[ERROR] <@!${message.author.id}> - Please specify a calculation (*e.g. ?math 2+2*)`)
				return;
			}
			request(`http://twitch.center/customapi/math?expr=${encodeURI(args[0]).replace(/\+/g, '%2B')}`, (err, res, body) => {
				if (err) {
    				console.log(err);
    				return; // You could post something in chat or just return, up to you.
				}
				if (body == '???') message.channel.send(`${args.join(' ')} = Invalid expression`);
				// ^ Optional, but recommended
				message.channel.send(`${args.join(' ')} = ${body}`);
			});
			break;
	}
})

client.login(config.token);