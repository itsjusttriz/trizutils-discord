import * as Discord from 'discord.js';
import * as config from './config.js';
import { default as axios } from 'axios';
import chalk from 'chalk';
import * as $ from './datapull/defaults.js';

const client = new Discord.Client();

let rolePing = new Map([
    ['itsjusttriz', false],
    ['domosplace', false],
    ['finncapp', false],
    ['bmwhd1', false]
]);

export async function getStreamUptime(caster) {
    let res = await axios.get(`https://decapi.me/twitch/uptime/${caster}`)
    let data = res.data
    return data;
}

export async function liveStreamAnnouncements(streamerName, clientId, twitchToken, embedColor, guildId, channelId, msgId, rolePingId) {
    if (typeof rolePingId === 'undefined') { rolePingId = '@everyone'; }

    let guildGrab = client.guilds.cache.get(guildId);
    let channelGrab = guildGrab.channels.cache.get(channelId);
    let msgGrab = await channelGrab.messages.fetch(msgId)
    let roleGrab = await guildGrab.roles.fetch(rolePingId);
    let botOwnerGrab = await client.users.fetch(config.botOwnerId);

    axios({
        method: 'get',
        url: `https://api.twitch.tv/helix/streams?user_login=${streamerName}`,
        headers: {
            'Client-ID': `${clientId}`,
            'Authorization': `Bearer ${twitchToken}`
        }
    }).then(async (response) => {
        let streamInfo = response.data.data[0];
        //
        if (response.data.data.length > 0 && streamInfo.type === 'live') {
            let liveEmbed = new Discord.MessageEmbed()
                .setTitle(':TwitchSymbol: Twitch Live Stream Notification :bell:')
                .setColor(guildGrab.me.displayHexColor)
                .addField('Channel', streamInfo.user_name)
                .addField('Stream Title', streamInfo.title)
                .addField('Stream Game', streamInfo.game_name, true)
                .addField('Viewers', streamInfo.viewer_count, true)
                .addField('Uptime', await getStreamUptime(streamerName))
                .addField('Link', `[Click to watch](https://twitch.tv/${streamInfo.user_name})`)
                .setImage(streamInfo.thumbnail_url.replace('{width}x{height}', '1920x1080') + `?r=${$.getRandomInt(0, 999999)}`)
                .setTimestamp()
            msgGrab.edit('', liveEmbed);
            if (rolePing.get(streamerName) === true) {
                channelGrab.send(roleGrab.toString()).then((msg) => {
                    msg.delete({ timeout: 2000 })
                    rolePing.set(streamerName, false);
                }).catch((error) => botOwnerGrab.send(error));
            }
        } else {
            let offlineEmbed = new Discord.MessageEmbed()
                .setTitle(':TwitchSymbol: Twitch Live Stream Notification :bell:')
                .setColor(guildGrab.me.displayHexColor)
                .setDescription(`:backEndCross: ${streamerName} is offline.\n\nKeep an eye on this channel to know when ${streamerName} is live!`)
                .setTimestamp()
            msgGrab.edit('', offlineEmbed)
            rolePing.set(streamerName, true);
        }
    }).catch((error) => {
        console.log(chalk.red.bold(error));
        let errorEmbed = new Discord.MessageEmbed()
            .setTitle(':TwitchSymbol: Twitch Live Stream Notification :bell:')
            .setColor('RED')
            .setDescription(`:backEndMinus: Cannot retrieve information! :backEndMinus:\n ${error}`)
            .setTimestamp()
        msgGrab.edit(botOwnerGrab.toString(), errorEmbed);
    })
}