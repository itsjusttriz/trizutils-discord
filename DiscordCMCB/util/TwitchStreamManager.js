import { MessageEmbed } from 'discord.js';
import { default as axios } from 'axios';
import { default as config } from '../config.js';
import { TwitchTokenManager } from './TwitchTokenManager.js';

export const TwitchStreamManager = {
    availability: true,
    testing: false,
    rolePingMap: new Map([
        ['itsjusttriz', false],
        ['domosplace', false],
        ['finncapp', false],
        ['bmwhd1', false],
        ['nottriz', false]
    ]),
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    async getStreamUptime(caster) {
        let res = await axios.get(`https://decapi.me/twitch/uptime/${caster}`)
        let data = res.data

        return data;
    },
    async getStreamStatus(caster, messageById) {

        const res = await axios.get(`https://api.twitch.tv/helix/streams?user_login=${caster}`, {
            headers: {
                'Client-ID': `${config.client_id}`,
                'Authorization': `Bearer ${TwitchTokenManager.cache['accessToken']}`
            }
        }).catch((error) => {
            console.error(error.response.data);
            newRes = 'ERROR!'
            messageById.edit(this.getErrorEmbed(error));
        });
        return res.data.data.length > 0 && res.data.data[0].type === 'live' ? res.data.data[0] : null;
    },
    async getLiveEmbed(guild, caster, streamData) {
        const embed = new MessageEmbed()
            .setTitle('<:TwitchSymbol:809538716933816321> Twitch Live Stream Notification :bell:')
            .setColor(guild.me.displayHexColor)
            .addField('Channel', streamData.user_name)
            .addField('Stream Title', streamData.title)
            .addField('Stream Game', streamData.game_name, true)
            .addField('Viewers', streamData.viewer_count, true)
            .addField('Uptime', await this.getStreamUptime(caster))
            .addField('Link', `[Click to watch](https://twitch.tv/${streamData.user_name})`)
            .setImage(streamData.thumbnail_url.replace('{width}x{height}', '1920x1080') + `?r=${this.getRandomInt(0, 999999)}`)
            .setTimestamp()

        return embed;
    },
    getOfflineEmbed(guild, caster) {
        const embed = new MessageEmbed()
            .setTitle('<:TwitchSymbol:809538716933816321> Twitch Live Stream Notification :bell:')
            .setColor(guild.me.displayHexColor)
            .setDescription(`<:backEndCross:809620114084593675> ${caster} is offline.\n\nKeep an eye on this channel to know when ${caster} is live!`)
            .setTimestamp()

        return embed;
    },
    getErrorEmbed(error) {
        const embed = new MessageEmbed()
            .setTitle('<:TwitchSymbol:809538716933816321> Twitch Live Stream Notification :bell:')
            .setColor('RED')
            .setDescription(`<:backEndMinus:809616743332708372> Cannot retrieve information! Contact Triz ASAP! <:backEndMinus:809616743332708372>\n\n\`${error}\``)
            .setTimestamp()

        return embed;
    },
    async post(client, caster, guildId, channelId, msgId, rolePingId) {
        if (typeof rolePingId === 'undefined') { rolePingId = '@everyone'; }

        let guildGrab = client.guilds.cache.get(guildId);
        let channelGrab = guildGrab.channels.cache.get(channelId);
        let msgGrab = await channelGrab.messages.fetch(msgId);
        let roleGrab = await guildGrab.roles.fetch(rolePingId);
        let botOwnerGrab = await client.users.fetch(client.config.botOwnerId);

        let isLive = await this.getStreamStatus(caster, msgGrab);

        if (!isLive) {
            msgGrab.edit('', this.getOfflineEmbed(guildGrab, caster));
            this.rolePingMap.set(caster, true);
        } else {
            msgGrab.edit('', this.getLiveEmbed(guildGrab, caster, isLive));
            if (this.rolePingMap.get(caster) === true) {
                channelGrab.send(roleGrab.toString()).then(m => {
                    m.delete({ timeout: 2000 });
                    this.rolePingMap.set(caster, false);
                }).catch(error => botOwnerGrab.send(error));
            }
        }
    }
}