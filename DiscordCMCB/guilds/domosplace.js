const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config');
const axios = require('axios')

const botOwner = require('../index.js').botOwner
let localBotLogs = '667483146417209344'

const comStatus = {
    "help": "true",
    "addserver": "true"
}
client.login(config.token);
const streamerName = 'domosplace'
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
                client.channels.fetch('770293246215192617').then(channel => {
                    channel.messages.fetch('770293386942218270').then(message => {
                        message.edit(liveEmbed)
                        console.log(`[${channel.guild.name}] {${channel.name}} Fixing LIVE embed (Live == true)`)
                    })
                    if (isOnCooldown(channel, command)) return;
                    else {
                        setCooldown(channel, command, 60 * 60 * 8)
                        channel.send(`@everyone`).then(msg => msg.delete({timeout: 1000 * 5}));
                    }
                });
            })
        } else {
            client.channels.fetch('770293246215192617').then(channel => {
                channel.messages.fetch('770293386942218270').then(message => {
                    let offlineEmbed = new Discord.MessageEmbed()
                    .setTitle(':bell: Twitch Live Stream Notification :bell:')
                    .setColor(embedColor)
                    .setDescription(`:x: ${streamerName} is offline.\n\nKeep an eye on this channel to know when ${streamerName} is live!`)
                    .setTimestamp()
                    message.edit(offlineEmbed)
                    console.log(`[${channel.guild.name}] {${channel.name}} Fixing LIVE embed (Live == false)`)
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
			message.author.send(helpembed)
            break;
        case '?addserver':
            if (comStatus.addserver !== 'true') return;
            if (message.author.id !== botOwner && message.author.id !== owner.user.id) return;
            if (message.channel.id !== '504753984607617065' && message.channel.id !== localBotLogs) return;
            if (!args[0]) {
                const addserverArgsEmbed = new Discord.MessageEmbed()
                    .setTitle('Missing Parameters...')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setColor(embedColor)
                    .addField('Command', `${command}`, true)
                    .addField('Possible Parameters', `compactclaustrophobia`, true)
                    .setFooter(`User ID: ${message.author.id}`)
                    .setTimestamp()
                message.delete()
                message.channel.send(addserverArgsEmbed)
            } else if (args[0] == 'compactclaustrophobia') {
                const compactclaustrophobiaEmbed = new Discord.MessageEmbed()
                    .setTitle('Compact Claustrophobia Server Info')
                    .setColor(embedColor)
                    .addField('Status', ':white_check_mark: Online', true)
                    .addField('IP', '\`HIDDEN\`', true)
                    .addField('Pack Version', '1.3.5.2', true)
                    .addField('Notes // Rules', '‣ Have Fun.\n‣ Don\'t fuck it up!')
                    .addField('Pack Download', '[Click Here](https://www.curseforge.com/minecraft/modpacks/compact-claustrophobia)', true)
                    .addField('Issue Tracker', '-', true)
                    .addField('Packmode Guidance', '[Click Here](https://discord.com/invite/p4VKM2F)', true)
                    .setFooter(`Last Edited`)
                    .setTimestamp()
                message.delete()
                message.channel.send(compactclaustrophobiaEmbed)
            }
            break;
	}
}

module.exports.handleMessage = handleMessage
