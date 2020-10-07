const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('../config.json');
const botOwner = require('../index.js').botOwner

const comStatus = {
	"help": "true",
	"serverinfo": "true",
	"pokedodie": "false"
}

function handleMessage(message) {
	let command = message.content.split(' ')[0];
	const { guild } = message
	const { name, region, memberCount, owner, afkTimeout } = guild
	const icon = guild.iconURL()

	switch(command) {
		case '?help':
			if (comStatus.help !== 'true') return;
			const helpembed = new Discord.MessageEmbed()
				.setTitle('Command Help')
				.setAuthor(message.author.username, message.author.displayAvatarURL())
				.setFooter("Guild: " + guild.name)
				.setTimestamp()
				.setColor('#5832a8')
				.setDescription('<@!228167686293553164> is currently learning DiscordJS.\n There\'s only a couple commands available below at this current time.')
				.addField('\`!help\`', 'Retrieves this embed response.')
				.addField('\`!serverinfo\`', 'Retrieves an embed response containing the current Server Info.')
				.addField(`\`!pokedodie\` (*${owner.user.username} ONLY*)`, 'Sends a heartwarming DM to <@!419996490170105869>')
			message.channel.send(helpembed)
			return;
		case '?serverinfo':
			if (comStatus.serverinfo !== 'true') return;
			const serverinfoembed = new Discord.MessageEmbed()
				.setTitle(`Server Info: ${name}`)
				.setThumbnail(icon)
				.addField("Region", region)
				.addField("Members", memberCount)
				.addField("Owner", owner.user.tag)
				.addField("AFK Timeout", afkTimeout / 60 + ' minutes')

			message.channel.send(serverinfoembed)
			return;
		case '?pokedodie':
			if (comStatus.pokedodie !== 'true') return;
			if (message.author.id !== botOwner) return;
			client.users.fetch(/*'419996490170105869'*/'228167686293553164').then(user => {
				const pokedodieembed = new Discord.MessageEmbed()
					.setTitle('Hi, Dodie!')
					.setThumbnail(user.iconURL)
					.setDescription('Triz says he loves you. You\'ll figure it out! <3')
				user.send(pokedodieembed)
			})
			return;
	}
}

module.exports.handleMessage = handleMessage

