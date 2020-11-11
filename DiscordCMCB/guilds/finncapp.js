const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config');
const axios = require('axios')

const botOwner = require('../index.js').botOwner
const localBotLogs = '744698836701806592';

const comStatus = {
	"help": "true",
    "addserver": "true"
}
client.login(config.token);
const streamerName = 'finncapp'
const embedColor = '#FFA500'

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
                client.channels.fetch('770296176565682266').then(channel => {
                    channel.messages.fetch('770302037169930300').then(message => {
                        message.edit(liveEmbed)
                    })
                    if (isOnCooldown(channel, command)) return;
                    else {
                        setCooldown(channel, command, 60 * 60 * 8)
                        channel.send(`<@&770107042182332426>`).then(msg => msg.delete({timeout: 1000 * 5}));
                    }
                });
            })
        } else {
            client.channels.fetch('770296176565682266').then(channel => {
                channel.messages.fetch('770302037169930300').then(message => {
                    let offlineEmbed = new Discord.MessageEmbed()
                    .setTitle(':bell: Twitch Live Stream Notification :bell:')
                    .setColor(embedColor)
                    .setDescription(`:x: ${streamerName} is offline.\n\nKeep an eye on this channel to know when ${streamerName} is live!`)
                    .setTimestamp()
                    message.edit(offlineEmbed)
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
                .addField('\`?addserver\`', `Adds Embed providing listed Server Info (*Triz Only*)`)
			message.author.send(helpembed)
            break;
        case '?fixrolemsg':
            if (message.author.id !== botOwner) return;
            if (message.channel.id !== '744394110689083485' && message.channel.id !== localBotLogs) return;
            if (args[0] === 'general') {
            let roleMsg1 = new Discord.MessageEmbed()
            .setTitle('General Roles')
            .setColor('#FF9100')
            .setDescription(`These roles are provided by a member of staff or an integration.\n**THESE ARE NOT CLAIMABLE!**\n-----------------------------------------------------------------------------------------------\n-----------------------------------------------------------------------------------------------`)
            .addField('Special', 'Users with this role gain access to a private Voice Channel :eyes:')
            .addField('Server Booster', 'Users with this role have provided this server with a Nitro Boost. :heart_eyes:')
            .addField('Subscriber', 'Users with this role have subbed/re-subbed/been gifted a sub to Finn on Twitch. <:finncaLove:686227560627306515>')
            .addField('LIVE', 'Users with this role are currently in Streamer Mode and you should go show them some love. :wink:')
            .addField('Mods', `Users with this role hold the hammer. Follow the rules and they won't "accidentally" drop it on your head. :smiling_imp:`)
            .addField('Admin', `Users with this role maintain the "behind-the-scenes" functions of both this server and Finn's Twitch.`)
            message.channel.messages.fetch('771467879118798888').then(msg => {
                msg.edit(roleMsg1)
            })
            } else if (args[0] === 'games') {
            let roleMsg2 = new Discord.MessageEmbed()
            .setTitle('Games')
            .setColor('#066A00')
            .setDescription(`-----------------------------------------------------------------------------------------------\n-----------------------------------------------------------------------------------------------`)
            .addField(':joystick: Games - General', `Users with this role will gain access to the <#586461487221178378>. This channel is used for all games that **DON'T** have their own channel.`)
            .addField(':sauropod: Games - Ark', 'Users with this role will gain access to Ark-related text channels & voice channels.')
            .addField(':smiling_imp:  Games - Diablo', 'Users with this role will gain access to Diablo-related text channels & voice channels.')
            .addField(':magic_wand: Games - Genshin', 'Users with this role will gain access to Genshin-related text channels & voice channels.')
            .addField(':pick: Games - Minecraft', 'Users with this role will gain access to Minecraft-related text channels & voice channels.')
            .addField(':crystal_ball: Games - Path of Exile', 'Users with this role will gain access to POE-related text channels & voice channels.')
            .addField(':crossed_swords: Games - World of Warcraft', 'Users with this role will gain access to World of Warcraft-related text channels & voice channels.')
            .addField(':octagonal_sign: Games - Community Servers', 'Users with this role will gain access to the Community <#676294700402999296> channel.\n**THIS ROLE IS NOT CLAIMABLE**')
            message.channel.messages.fetch('771467880021098544').then(msg => {
                msg.edit(roleMsg2)
            })
            } else if (args[0] === 'optional') {
            let roleMsg3 = new Discord.MessageEmbed()
            .setTitle('Optional Roles')
            .setColor('#0062FB')
            .setDescription(`-----------------------------------------------------------------------------------------------\n-----------------------------------------------------------------------------------------------`)
            .addField(':mega: FinnStream - Notify', 'Users with this role will be pinged when <@!763135917329743903> posts that Finn is currently streaming!')
            .setTimestamp()
            message.channel.messages.fetch('771467881086976011').then(msg => {
                msg.edit(roleMsg3)
            })
            } else {
                message.channel.send('Please specify an option. (*?fixrolemsg general, games, optional*)').then(msg => msg.delete({timeout: 1000 * 10}))
            }
            message.delete({timeout: 1000})
            break;
        case '?addserver':
            if (comStatus.addserver !== 'true') return;
            if (message.author.id !== botOwner && message.author.id !== owner.user.id) return;
            if (message.channel.id !== '676294700402999296' && message.channel.id !== localBotLogs) return;
            if (!args[0]) {
                const addserverArgsEmbed = new Discord.MessageEmbed()
                    .setTitle('Missing Parameters...')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setColor(embedColor)
                    .addField('Command', `${command}`, true)
                    .addField('Possible Parameters', `rules
                        regrowth
                        po3kappa
                        skyworkshop
                        `, true)
                    .setFooter(`User ID: ${message.author.id}`)
                    .setTimestamp()
                message.delete()
                message.channel.send(addserverArgsEmbed)
            } else if (args[0] == 'rules') {
                const comServerRulesEmbed = new Discord.MessageEmbed()
                    .setTitle('Community Server Rules')
                    .setColor('#590105')
                    .setDescription(`:warning: **These servers are accessible to active & approved members of this community alone!** :warning:

                        ‣ Sharing the Server Details with non-approved community members will result in a ban from all servers AND the Stream.

                        ‣ Triz is the main point of contact with server-related issues. Marcks & Vertex are backup.

                        ‣ Anyone known to be building phallic creatons and/or laggy automations will be dealt with accordingly.

                        ‣ Overflow protection is a MUST.

                        ‣ It would be encouraged and appreciated for community members to help support the payment of servers in the various ways available.

                        ‣ Having subscriber status does not provide immediate access to Community Servers. You must be a well-known and an approvably interactive member of this community.

                        **These rules are subject to change at any given time!**`)
                    .setFooter('Author: FinnArmy Staff Team')
                    .setTimestamp()
                message.delete()
                let rulesMsgEmbed = message.channel.messages.fetch('767896235641798697')
                    .then(message => {
                        message.edit(comServerRulesEmbed)
                    })
                if (!rulesMsgEmbed) return message.channel.send(comServerRulesEmbed)
                else rulesMsgEmbed;
            } else if (args[0] == 'regrowth') {
                const regrowthEmbed = new Discord.MessageEmbed()
                    .setTitle('Regrowth Server Info')
                    .setColor(embedColor)
                    .addField('Status', ':white_check_mark: Online', true)
                    .addField('IP', '\`HIDDEN\`', true)
                    .addField('Pack Version', '1.0.2', true)
                    .addField('Notes // Rules', `
                        ‣ This is the MC 1.7.10 version.
                        ‣ There is no \`/back\` command.
                        ‣ There is no map mod. Download JourneyMap [here](https://www.curseforge.com/minecraft/mc-mods/journeymap/files/2367915).
                        ‣ If you lose your Questbook. Press \`H\` and Click \`Library\` in the top corner.
                        `)
                    .addField('Pack Download', '[Click Here](https://www.curseforge.com/minecraft/modpacks/regrowth-an-hqm-pack/files)', true)
                    .addField('Issue Tracker', '[Click Here](https://github.com/thephoenixlodge/Regrowth-Stuff/issues)', true)
                    .addField('Packmode Guidance', '-', true)
                    .setFooter(`Last Edited`)
                    .setTimestamp()
                message.delete()
                message.channel.send(regrowthEmbed)
            } else if (args[0] == 'po3kappa') {
                const po3kappaEmbed = new Discord.MessageEmbed()
                    .setTitle('PO3 Kappa Server Info')
                    .setColor(embedColor)
                    .addField('Status', ':white_check_mark: Online', true)
                    .addField('IP', '\`HIDDEN\`', true)
                    .addField('Pack Version', '3.3.60', true)
                    .addField('Notes // Rules', `
                        ‣ This is the MC 1.12.2 version.

                        ‣ Command Block placed at \`/spawn\` to provide you with your own island. (*One island per person*)
                        
                        ‣ Use \`/sethome\` as soon as you receive your island.
                        `)
                    .addField('Pack Download', '[Click Here](https://www.curseforge.com/minecraft/modpacks/project-ozone-3-a-new-way-forward)', true)
                    .addField('Issue Tracker', '[Click Here](https://github.com/Cazadorsniper/PO3/issues)', true)
                    .addField('Packmode Guidance', '[Click Here](https://www.youtube.com/watch?v=cRDoOz2rOck)', true)
                    .setFooter(`Last Edited`)
                    .setTimestamp()
                message.delete()
                let po3MsgEmbed = message.channel.messages.fetch('767903049838493698')
                    .then(message => {
                        message.edit(po3kappaEmbed)
                    })
                if (!po3MsgEmbed) return message.channel.send(po3kappaEmbed)
            } else if (args[0] == 'skyworkshop') {
                const skyWorkshopEmbed = new Discord.MessageEmbed()
                    .setTitle('Sky Workshop Server Info')
                    .setColor(embedColor)
                    .addField('Status', ':white_check_mark: Online', true)
                    .addField('IP', '\`HIDDEN\`', true)
                    .addField('Pack Version', '2.2.6', true)
                    .addField('Notes // Rules', `
                        ‣ This is the MC 1.12.2 version.
                        
                        ‣ No current issue tracker, so report bugs in [#support-and-convo](https://discord.com/channels/585627689612869645/667609165341917185)
                        and we'll bully marckskl into fixing it. :D
                        `)
                    .addField('Pack Download', '[Click Here](https://www.curseforge.com/minecraft/modpacks/skyworkshop)', true)
                    .addField('Issue Tracker', '-', true)
                    .addField('Packmode Guidance', '-', true)
                    .setFooter(`Last Edited`)
                    .setTimestamp()
                message.delete()
                message.channel.send(skyworkshop)
            }
            break;
	}
}

module.exports.handleMessage = handleMessage
