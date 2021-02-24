import { MessageEmbed } from 'discord.js';

const idStorage = [
    {
        guildName: 'finnarmy',
        guildId: '585627689612869645',
        channelIds: [
            {
                channelName: 'roles',
                channelId: '744394110689083485'
            },
            {
                channelName: 'bot-logs',
                channelId: '744698836701806592'
            }
        ]
    }
]

export default {
    name: 'fixrolemsg',
    usage: 'n!fixrolemsg <option> (Possible Options: `general`, `games`, `optional`)',
    description: 'Fixes an embed in various guilds.',
    permissions: '@botOwner',
    hidden: true,
    run(client, message, args) {
        message.delete({ timeout: 5000 });

        if (message.author.id !== client.config.botOwnerId) return;

        if (message.channel.id === idStorage[0].channelIds[0].channelId ?? message.channel.id === idStorage[0].channelIds[1].channelId) {

            switch (args[0]) {
                case 'general':
                    let roleMsg1 = new MessageEmbed()
                        .setTitle('General')
                        .setColor('#FF9100')
                        .setDescription(`These roles are provided by a member of staff or an integration.\n**THESE ARE NOT CLAIMABLE!**\n-----------------------------------------------------------------------------------------------\n-----------------------------------------------------------------------------------------------`)
                        .addField('Special', 'Users with this role gain access to a private Voice Channel :eyes:')
                        .addField('Server Booster', 'Users with this role have provided this server with a Nitro Boost. :heart_eyes:')
                        .addField('Subscriber', 'Users with this role have subbed/re-subbed/been gifted a sub to Finn on Twitch. <:finncaLove:686227560627306515>')
                        .addField('LIVE', 'Users with this role are currently in Streamer Mode and you should go show them some love. :wink:')
                        .addField('Mods', `Users with this role hold the hammer. Follow the rules and they won't "accidentally" drop it on your head. :smiling_imp:`)
                        .addField('Admin', `Users with this role maintain the "behind-the-scenes" functions of both this server and Finn's Twitch.`)
                    message.guild.channels.cache.get(idStorage[0].channelIds[0].channelId)
                        .messages.fetch('771467879118798888')
                        .then(m => m.edit(roleMsg1));
                    break;
                case 'games':
                    let roleMsg2 = new MessageEmbed()
                        .setTitle('Games')
                        .setColor('#066A00')
                        .setDescription(`-----------------------------------------------------------------------------------------------\n-----------------------------------------------------------------------------------------------`)
                        .addField(':joystick: Games - General', `Users with this role will gain access to the <#586461487221178378>. This channel is used for all games that **DON'T** have their own channel.`)
                        .addField(':sauropod: Games - Ark', 'Users with this role will gain access to Ark-related text channels & voice channels.')
                        .addField(':smiling_imp:  Games - Diablo', 'Users with this role will gain access to Diablo-related text channels & voice channels.')
                        .addField(':magic_wand: Games - Hades', 'Users with this role will gain access to Hades-related text channels & voice channels.')
                        .addField(':pick: Games - Minecraft', 'Users with this role will gain access to Minecraft-related text channels & voice channels.')
                        .addField(':crystal_ball: Games - Path of Exile', 'Users with this role will gain access to POE-related text channels & voice channels.')
                        .addField(':crossed_swords: Games - World of Warcraft', 'Users with this role will gain access to World of Warcraft-related text channels & voice channels.')
                        .addField(':octagonal_sign: Games - Community Servers', 'Users with this role will gain access to the Community <#676294700402999296> channel.\n**THIS ROLE IS NOT CLAIMABLE**')
                    message.guild.channels.cache.get(idStorage[0].channelIds[0].channelId)
                        .messages.fetch('771467880021098544')
                        .then(m => m.edit(roleMsg2));
                    break;
                case 'optional':
                    let roleMsg3 = new MessageEmbed()
                        .setTitle('Optional')
                        .setColor('#0062FB')
                        .setDescription(`-----------------------------------------------------------------------------------------------\n-----------------------------------------------------------------------------------------------`)
                        .addField(':mega: FinnStream - Notify', 'Users with this role will be pinged when <@!763135917329743903> posts that Finn is currently streaming!')
                        .setTimestamp()
                    message.guild.channels.cache.get(idStorage[0].channelIds[0].channelId)
                        .messages.fetch('771467881086976011')
                        .then(m => m.edit(roleMsg3))
                    break;
                default:
                    message.reply(`Please specify an option. (*${this.usage}*)`).then(msg => msg.delete({ timeout: 1000 * 10 }))
                    break;
            }
        } else message.reply('This command is disabled here.').then(m => m.delete({ timeout: 3000 }))
    }
}