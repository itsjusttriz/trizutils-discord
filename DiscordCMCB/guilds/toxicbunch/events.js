import * as Discord from 'discord.js';
import * as config from '../../config.js';
import * as $ from '../../datapull/defaults.js';
import { default as axios } from 'axios';

const guildChannelMap = new Map([
    ['mainLogChannel', '667483146417209344']
])

export function handleMessage(client, message, response) {

    switch ($.command(message)) {
        // @everyone
        // @guildOwner
        case 'n!addmcserver':
            if (message.author.id !== message.guild.ownerID && message.author.id !== config.botOwnerId) return;
            $.createMCEmbed(Discord, message);
            break;
        case 'n!fixserver':
            if (message.author.id !== message.guild.ownerID && message.author.id !== config.botOwnerId) return;
            if (message.channel.id !== '504753984607617065' && message.channel.id !== '780270864142303252' && message.channel.id !== localBotLogs) return;
            let serverList = ['compactclaustrophobia', 'dw20', 'trillionaire', 'skyofdiamonds'];
            if ($.firstArg(message)) {
                const addserverArgsEmbed = new Discord.MessageEmbed()
                    .setTitle('Missing Parameters...')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setColor(config.defaultEmbedColor)
                    .setFooter(`User ID: ${message.author.id}`)
                    .setTimestamp()
                    .addField('Command', `${command}`, true)
                    .addField('Possible Parameters', serverList.sort().join('\n'), true)
                message.channel.send(addserverArgsEmbed)
            } else if ($.firstArg(message).toLowerCase() === 'compactclaustrophobia') {
                const compactclaustrophobiaEmbed = new Discord.MessageEmbed()
                    .setTitle('Compact Claustrophobia Server Info')
                    .setColor(config.defaultEmbedColor)
                    .setFooter(`Last Edited`)
                    .setTimestamp()
                    .addField('Status', ':white_check_mark: Online', true)
                    .addField('IP', '\`tbcc.g.akliz.net\`', true)
                    .addField('Pack Version', '1.3.5.2', true)
                    .addField('Notes // Rules', '‣ Have Fun.\n‣ Don\'t fuck it up!')
                    .addField('Pack Download', '[Click Here](https://www.curseforge.com/minecraft/modpacks/compact-claustrophobia)', true)
                    .addField('Issue Tracker', '-', true)
                    .addField('Packmode Guidance', '-', true)
                message.channel.send(compactclaustrophobiaEmbed)
            } else if ($.firstArg(message).toLowerCase() === 'dw20') {
                const dw20Embed = new Discord.MessageEmbed()
                    .setTitle('DireWolf20 Server Info')
                    .setColor(config.defaultEmbedColor)
                    .setFooter(`Last Edited`)
                    .setTimestamp()
                    .addField('Status', ':white_check_mark: Online', true)
                    .addField('IP', '\`tbdw20.g.akliz.net\`', true)
                    .addField('Pack Version', '1.1.2', true)
                    .addField('Notes // Rules', '‣ Have Fun.\n‣ Don\'t fuck it up!')
                    .addField('Pack Download', '[Click Here](https://www.curseforge.com/minecraft/modpacks/ftb-presents-direwolf20-1-12)', true)
                    .addField('Issue Tracker', '-', true)
                    .addField('Packmode Guidance', '-', true)
                message.channel.send(dw20Embed)
            } else if ($.firstArg(message).toLowerCase() === 'skyofdiamonds') {
                const skyofdiamondsEmbed = new Discord.MessageEmbed()
                    .setTitle('Awakening - Sky of Diamonds Server Info')
                    .setColor(config.defaultEmbedColor)
                    .setFooter(`Last Edited`)
                    .setTimestamp()
                    .addField('Status', ':white_check_mark: Online', true)
                    .addField('IP', '\`toxicbunchnye.g.akliz.net\`', true)
                    .addField('Pack Version', '1.18.0', true)
                    .addField('Notes // Rules', '‣ Have Fun.\n‣ Don\'t fuck it up!')
                    .addField('Pack Download', '[Click Here](https://www.curseforge.com/minecraft/modpacks/awakening-sky-of-diamonds)', true)
                    .addField('Issue Tracker', '-', true)
                    .addField('Packmode Guidance', '-', true)
                message.channel.send(skyofdiamondsEmbed)
            } else if ($.firstArg(message).toLowerCase() == 'trillionaire') {
                const trillionaireEmbed = new Discord.MessageEmbed()
                    .setTitle('Minecraft Trillionaire Server Info')
                    .setColor(config.defaultEmbedColor)
                    .setFooter(`Last Edited`)
                    .setTimestamp()
                    .addField('Status', ':white_check_mark: Online', true)
                    .addField('IP', '\`tbsubserver.g.akliz.net\`', true)
                    .addField('Pack Version', '1.1.3', true)
                    .addField('Notes // Rules', '‣ Have Fun.\n‣ Don\'t fuck it up!')
                    .addField('Pack Download', '[Click Here](https://www.curseforge.com/minecraft/modpacks/minecraft-trillionaire)', true)
                    .addField('Issue Tracker', '-', true)
                    .addField('Packmode Guidance', '-', true)
                message.channel.send(trillionaireEmbed)
            }
            break;
    }
}
