const Discord = require('discord.js');
const config = require('./config');

const client = new Discord.Client(["ADMINISTRATOR"]);


const domosplace = require('./channels/domosplace.js');
const itsjusttriz = require('./channels/itsjusttriz.js');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
const guildID = msg.guild.id;
const channelName = msg.channel.name;

	if (guildID == '466402083466379267') {
		itsjusttriz.handleChat(msg);
	} else if (guildID == '155849052850880513') {
		domosplace.handleChat(msg);
	}
});

client.login(config.token);