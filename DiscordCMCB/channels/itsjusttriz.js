const Discord = require('discord.js');
const config = require('../config');

const client = new Discord.Client(["ADMINISTRATOR"]);

function handleChat(msg) {
	const guildID = msg.guild.id;
	const channelName = msg.channel.name;

	if (channelName.includes("discord-bots")) {
		if (msg.content.toLowerCase() == '!testembed') {
			const embed = new Discord.MessageEmbed()
				.setColor('#fc2eff')
				.setTitle('Test Embed')
				.setDescription('This is a test embed for Nottriz CMCB\n[Invite Bot](https://discord.com/api/oauth2/authorize?client_id=763135917329743903&permissions=499641462&scope=bot)')
				.setTimestamp();
			msg.channel.send(embed);
		}
	}
}

module.exports.handleChat = handleChat;