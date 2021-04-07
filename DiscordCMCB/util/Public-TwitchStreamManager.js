import { MessageEmbed } from 'discord.js';

export const PublicStreamManager = {
    CLIENT: null,
    OLD_PRESENCE: null,
    NEW_PRESENCE: null,
    CHANNEL: null,
    MESSAGE: null,
    REQUIRED_ROLE: null,
    LIVE_ROLE: null,
    ACTIVITY: null,
    STATUS: new Map(),
    BOOLEAN: new Map(),
    LiveEmbed() {
        let embed = new MessageEmbed()
            .setTitle('<:TwitchSymbol:809538716933816321> Twitch Live Stream Notification :bell:')
            .setColor(this.NEW_PRESENCE.member.displayHexColor || '#FEFEFE')
            .addField('Member', this.NEW_PRESENCE.member)
            .addField('Channel', this.ACTIVITY.url.replace('https://www.twitch.tv/', ''))
            .addField('Stream Title', this.ACTIVITY.details)
            .addField('Stream Game', this.ACTIVITY.state, true)
            .addField('Link', `[Click to watch](${this.ACTIVITY.url})`)
            .setThumbnail(this.NEW_PRESENCE.user.displayAvatarURL({ size: 512 }))
            .setTimestamp()

        return embed;
    },
    offlineEmbed(msgObject) {
        let embed = new MessageEmbed()
            .setTitle(':x: Channel Offline :x:')
            .setColor(this.CLIENT.colorWheel.get('RED'))
            .addField('Member', this.NEW_PRESENCE.member)
            .addField('Channel', msgObject.embeds[0].fields[1].value)
            .addField('Follow Them Here', `[Link](${msgObject.embeds[0].fields[4].value.match(/\((.*?)\)/i)[1]})`)
            .setThumbnail(this.NEW_PRESENCE.user.displayAvatarURL({ size: 512 }))

        return embed;
    },
    async addRole(presence) {
        if (!this.LIVE_ROLE) return;

        return await presence.member.roles.add(this.LIVE_ROLE.id);
    },
    async removeRole(presence) {
        if (!this.LIVE_ROLE) return;

        return await presence.member.roles.remove(this.LIVE_ROLE.id);
    },
    async init(client, oldPresence, newPresence, channel, reqRole, liveRole) {

        this.CLIENT = client;
        this.OLD_PRESENCE = oldPresence;
        this.NEW_PRESENCE = newPresence;
        this.ACTIVITY = newPresence.activities.find(a => a.type === 'STREAMING');

        this.CHANNEL = newPresence.guild.channels.cache.get(channel);
        this.REQUIRED_ROLE = newPresence.guild.roles.cache.get(reqRole) ?? null;
        this.LIVE_ROLE = newPresence.guild.roles.cache.get(liveRole) ?? null;

        if (this.ACTIVITY) {
            if (this.ACTIVITY.name === 'Twitch') {
                if (!this.NEW_PRESENCE.member.roles.cache.has(this.REQUIRED_ROLE.id)) return;
                if (this.BOOLEAN.get(this.NEW_PRESENCE.user.id) === 'true') return;

                this.addRole(newPresence);

                this.CHANNEL.send('', this.LiveEmbed()).then(m => {
                    this.STATUS.set(this.NEW_PRESENCE.user.id, m.id)
                    this.BOOLEAN.set(this.NEW_PRESENCE.user.id, 'true');
                })
                return;
            }
        } else {
            if (!this.NEW_PRESENCE.member.roles.cache.has(this.REQUIRED_ROLE.id)) return;
            if (!this.STATUS.has(this.NEW_PRESENCE.user.id)) return;

            this.removeRole(newPresence);

            // const msgObject = this.CHANNEL.messages.cache.get(this.STATUS.get(this.NEW_PRESENCE.user.id));
            // msgObject.edit('', this.offlineEmbed(msgObject)).then(() => this.STATUS.delete(this.NEW_PRESENCE.user.id));

            this.BOOLEAN.set(this.NEW_PRESENCE.user.id, 'false');
        }
    }
}