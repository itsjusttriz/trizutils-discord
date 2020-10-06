const Discord = require('discord.js');
const config = require('../config');

const client = new Discord.Client(["ADMINISTRATOR"]);

function handleChat(msg) {
	const guildID = msg.guild.id;
	const channelName = msg.channel.name;

	if (channelName.includes("click-talk")) {
		if (msg.content.toLowerCase() == '!example') {
			const embed = new Discord.MessageEmbed()
				.setColor('#fc2eff')
				.setTitle('Hello Click Mods...')
				.setDescription('This is a test embed for Nottriz CMCB')
				.setTimestamp();
			msg.channel.send(embed);
		}
	}
}

module.exports.handleChat = handleChat;