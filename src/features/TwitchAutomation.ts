import { Client, Message, MessageActionRow, MessageButton, MessageEmbed, TextChannel } from 'discord.js'
import { findChannelByName, findRoleByName, StreamInfo } from '../Utils/Util';
import WOKCommands from 'wokcommands'

let liveCache = new Map<string, boolean>();
let msgCache = new Map<string, Message>();

export default (client: Client, instance: WOKCommands) =>
{
    client.on('presenceUpdate', async (prev, current) =>
    {
        if (!current.guild) return;

        const isStreaming = current.activities.find(a => a.type === 'STREAMING' && a.name === 'Twitch');
        const wasStreaming = prev?.activities.find(a => a.type === 'STREAMING' && a.name === 'Twitch');
        const { member } = prev || current;

        let channel = (findChannelByName(current?.guild, 'self-promotion') || findChannelByName(current?.guild, 'testing')) as TextChannel;
        let role = findRoleByName(current?.guild, 'LIVE')

        const mapKey = `${member?.user.id}_${member?.guild.id}`;

        if (wasStreaming && isStreaming) return;

        if (!wasStreaming && isStreaming)
        {

            if (!channel)
                return console.log(`No channel available to push Twitch data for ${current.user?.tag} in ${current.guild?.name}.`)

            if (!role)
                role = await current.guild?.roles.create({
                    name: 'LIVE',
                    position: current.guild?.roles.cache.size - 3,
                    reason: 'LIVE role needed for Twitch autorole.',
                    hoist: true,
                    color: '#a85af6'
                });

            const streamInfo = new StreamInfo(isStreaming);

            if (role && !current.member?.roles.cache.has(role.id))
                await current.member?.roles.add(role.id)

            if (!msgCache.get(mapKey))
            {
                const e = new MessageEmbed()
                    .setTitle(current.user?.tag + ' is streaming!')
                    .setDescription('_Click the button below to open the stream!_')
                    .addFields([
                        { name: 'Title', value: streamInfo.title },
                        { name: 'Category', value: streamInfo.category },
                        { name: 'Started', value: `<t:${Math.floor(Date.now() / 1000)}>` }
                    ])
                    .setImage(streamInfo.image)
                    .setThumbnail(current.user?.displayAvatarURL({ format: 'png', size: 128 }) as string)

                const b = new MessageButton().setURL(streamInfo.url).setStyle('LINK').setLabel('Watch');
                const r = new MessageActionRow().addComponents(b);
                const m = await channel?.send({ embeds: [e], components: [r] })
                if (!liveCache.get(mapKey))
                {
                    msgCache.set(mapKey, m)
                    liveCache.set(mapKey, true)
                }
                return;
            }
        }
        else if (wasStreaming && !isStreaming)
        {
            liveCache.set(mapKey, false);
            if (role && current.member?.roles.cache.has(role.id))
                prev?.member?.roles.remove(role.id);

            if (msgCache.get(mapKey) && msgCache.get(mapKey)?.deletable)
            {
                setTimeout(async () =>
                {
                    if (liveCache.get(mapKey)) return;
                    await (msgCache.get(mapKey))?.delete().catch(console.error)
                    msgCache.delete(mapKey)
                }, 1000 * 60 * 2);
            }
        }

    })
}

export const config = {
    displayName: 'Twitch Stream Automation',
    dbName: 'TWITCH_STREAM_AUTOMATION'
}