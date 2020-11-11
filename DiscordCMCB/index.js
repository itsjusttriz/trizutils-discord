const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');

const config = require('./config');

const botOwner = '228167686293553164';
module.exports.botOwner = botOwner

const guildIdList = {
	"itsjusttriz": "466402083466379267",
	"domosplace": "155849052850880513",
	"finncapp": "585627689612869645",
	"nottriz": "768289504603275265"
}

var presenceStatus = true
const comStatus = {
	"serverinfo": "true",
}
const embedColor = '#a87d32'

const itsjusttrizGuildFile = require('./guilds/itsjusttriz.js')
const domosplaceGuildFile = require('./guilds/domosplace.js')
const finncappGuildFile = require('./guilds/finncapp.js')
const nottrizGuildFile = require('./guilds/nottriz.js')

client.login(config.token);

client.on('ready', async (message) => {
	client.channels.fetch('509833053171089428').then(channel => {
		console.log(`Client loaded under <@!${client.user.id}`)
		console.log(client.users.cache.size)
		if (presenceStatus === true) {
			const connectEmbed1 = new Discord.MessageEmbed()
				.setTitle(`🟢 Online`)
				.setColor(embedColor)
				.setDescription(`Syncing Nottriz CMCB (*Discord*) with...`)
				.addField('Users', `${client.users.cache.size}`, true)
				.addField('Channels', client.channels.cache.size, true)
				.addField('Guilds', client.guilds.cache.size, true)
			channel.send(connectEmbed1)
			client.user.setPresence({
				activity: {
					name: 'Use ?help',
					type: 0
				}
			})
		} else {
			const connectEmbed2 = new Discord.MessageEmbed()
				.setTitle(`🟡 Online - Maintenance Mode`)
				.setColor(embedColor)
				.setDescription(`Syncing Nottriz CMCB (*Discord*) with...`)
				.addField('Users', `${client.users.cache.size}`, true)
				.addField('Channels', client.channels.cache.size, true)
				.addField('Guilds', client.guilds.cache.size, true)
			channel.send(connectEmbed2)
			client.user.setPresence({
				activity: {
					name: '[Under Maintenance]',
					type: 0
				}
			})
		}
	});
});

client.on('message', async (message, response) => {
	let args = message.content.split(' ');
	let command = args.shift().toLowerCase();
	const { guild } = message
	if (message.channel.type == 'dm') {
		if (message.author.id == '763135917329743903') return;
		client.users.fetch('228167686293553164').then((user) => {
			console.log(`[DM] <${message.author.tag}> ${message}`)
			let privDmEmbed = new Discord.MessageEmbed()
				.setAuthor(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL())
				.setDescription(message)
				.setFooter('Sent to CMCB DMs at')
				.setTimestamp()
			user.send(privDmEmbed)
		})
		.catch()
	}

	if (message.channel.type !== 'dm') {
		if (message.author.bot) return;
		console.log(`[${guild.name}] {${message.channel.name}} <${message.author.tag}> ${message}`);
	} else
		return;

	if (message.guild.id === guildIdList.itsjusttriz) {
		itsjusttrizGuildFile.handleMessage(client, message, response);
	} else if (message.guild.id === guildIdList.domosplace) {
		domosplaceGuildFile.handleMessage(client, message, response);
	} else if (message.guild.id === guildIdList.finncapp) {
		finncappGuildFile.handleMessage(client, message, response);
	} else if (message.guild.id === guildIdList.nottriz) {
		nottrizGuildFile.handleMessage(client, message, response);
	}

	switch(command) {
		case '?help':
			const helpembed = new Discord.MessageEmbed()
				.setTitle('Global Command Help')
				.setAuthor(message.author.username, message.author.displayAvatarURL())
				.setFooter("Guild: " + guild.name)
				.setTimestamp()
				.setColor(embedColor)
				.setDescription('To add Server-specific commands, join the support server [here](https://nottriz.weebly.com/support)\n\nBelow, are the current global commands:')
				.addField('\`?help\`', 'Retrieves this embed response.')
				.addField(`\`?serverinfo\` (*Server-Owner ONLY*)`, 'Retrieves Server Information')
				.addField(`\`?math\``, 'Calculation Command')
			message.delete({ timeout: 5000 })
			message.channel.send('Please check your DMs for a reply!').then(msg => {
				msg.delete({ timeout: 5000 })
			});
			message.author.send(helpembed)
			break;
		case '?support':
			const supportEmbed = new Discord.MessageEmbed()
				.setTitle('Join the Discord!')
				.setAuthor(message.author.username, message.author.displayAvatarURL())
				.setFooter("Guild: " + guild.name)
				.setTimestamp()
				.setColor(embedColor)
				.setDescription('[Click Here](https://nottriz.weebly.com/support) to join the Official CMCB Discord server to get support with any issues that may arise within both the Twitch and Discord ends of Nottriz CMCB.')
				message.delete({ timeout: 5000 })
				message.channel.send('Please check your DMs for a reply!').then(msg => {
					msg.delete({ timeout: 5000 })
				});
				message.author.send(supportEmbed)
			break;
		case '?serverinfo':
			if (message.author.id !== message.guild.ownerID && message.author.id !== botOwner) return;
			if (comStatus.serverinfo !== 'true') return;
			const serverinfoembed = new Discord.MessageEmbed()
				.setTitle(`Server Info: ${guild.name}`)
				.setColor(embedColor)
				.setThumbnail(guild.iconURL())
				.addField("Region", guild.region)
				.addField("Members", guild.memberCount)
				.addField("Owner", guild.owner.user.tag)
				.addField("AFK Timeout", guild.afkTimeout / 60 + ' minutes')
			message.channel.send(serverinfoembed)
			break;
		case '?math':
			if (!args[0]) {
				message.channel.send(`[ERROR] <@!${message.author.id}> - Please specify a calculation (*e.g. ?math 2+2*)`)
				return;
			}
			axios.get(`http://twitch.center/customapi/math?expr=${encodeURI(args[0]).replace(/\+/g, '%2B')}`)
				.then(function (response) {
					console.log(`RESPONSE: ${response.data}`);
					if (response.data == '???') message.channel.send(`${args.join(' ')} = Invalid expression`);
					message.channel.send(`${args.join(' ')} = ${response.data}`);
				})
				.catch(function (error) {
					console.log(`ERROR: ${error}`)
				})
			break;
		case '?spam':
			if (message.author.id !== botOwner) return;
			let num = args.shift();
			for (let i = 0; i < num; i++) {
				setTimeout(function letsbreakchat() {
					message.channel.send(args.join(' '));
				}, 100 * i );
			}
			break;
	}
});

// We start by declaring a guildMemberUpdate listener
// This code should be placed outside of any other listener callbacks to prevent listener nesting
client.on('guildMemberUpdate', (client, oldMember, newMember) => {
	if (oldMember.guild.id === guildIdList.itsjusttriz) {
		itsjusttrizGuildFile.handleGuildMemberUpdate(client, oldMember, newMember);
	} else if (oldMember.guild.id === guildIdList.nottriz) {
		nottrizGuildFile.handleGuildMemberUpdate(client, oldMember, newMember);
	} else
		return;
});

client.on('guildMemberAdd', (member) => {
	if (member.guild.id === guildIdList.itsjusttriz) {
		itsjusttrizGuildFile.handleGuildMemberAdd(member);
	} else if (member.guild.id === guildIdList.nottriz) {
		nottrizGuildFile.handleGuildMemberAdd(member);
	} else
		return;
});

client.on('guildMemberRemove', (member) => {
	if (member.guild.id === guildIdList.itsjusttriz) {
		itsjusttrizGuildFile.handleGuildMemberRemove(member);
	} else if (member.guild.id === guildIdList.nottriz) {
		nottrizGuildFile.handleGuildMemberRemove(member);
	} else
		return;
});
