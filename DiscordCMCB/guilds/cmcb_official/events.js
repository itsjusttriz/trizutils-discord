import { MessageEmbed } from "discord.js";
import chalk from 'chalk';

// Channels
const guildChannelMap = new Map([
    ['mainLogChannel', '768956331507580948'],
    ['roleLogChannel', '775541436577218571'],
    ['joinLogChannel', '775541639703560192'],
    ['messageLogChannel', '775541523227738112']
])

export async function handleGuildMemberUpdate(client, oldMember, newMember) {
    let channel = newMember.guild.channels.cache.get(guildChannelMap.get('roleLogChannel'))
    // If the role(s) are present on the old member object but no longer on the new one (i.e role(s) were removed)

    const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));

    if (removedRoles.size > 0) {
        // console.log(`The roles ${removedRoles.map(r => r.name)} were removed from ${oldMember.displayName} in ${oldMember.guild.name}.`);
        let embed1 = new MessageEmbed()
            .setAuthor(`${oldMember.user.tag}`, oldMember.user.displayAvatarURL())
            .addField(`${client.systemEmojis.get('BACKEND_MINUS')} Removed Role`, `${removedRoles.map(r => r.name)}`)
            .setFooter(`UserID: ${oldMember.id}`)
            .setColor(client.colorWheel.get('RED'))
            .setTimestamp()

        return channel.send(embed1)
    }

    // If the role(s) are present on the new member object but are not on the old one (i.e role(s) were added)
    const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));

    if (addedRoles.size > 0) {
        // console.log(`The roles ${addedRoles.map(r => r.name)} were added to ${oldMember.displayName} in ${oldMember.guild.name}.`);
        let embed2 = new MessageEmbed()
            .setAuthor(`${oldMember.user.tag}`, oldMember.user.displayAvatarURL())
            .addField(`${client.systemEmojis.get('BACKEND_PLUS')} Added Role`, `${addedRoles.map(r => r.name)}`)
            .setFooter(`UserID: ${oldMember.id}`)
            .setColor(client.colorWheel.get('GREEN'))
            .setTimestamp()

        return channel.send(embed2)
    }
}

export async function handleGuildMemberAdd(client, member) {
    let embed = new MessageEmbed()
        .setColor(client.colorWheel.get('GREEN'))
        .addField('Action', `${client.systemEmojis.get('BACKEND_JOIN')} Member Joined`, false)
        .addField('Username', member.user.username, true)
        .addField('ID', member.user.id, false)
        .addField('Bot?', member.user.bot, true)
        .addField('Discriminator', member.user.discriminator, true)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
    await client.channels.fetch(guildChannelMap.get('joinLogChannel')).then(channel => {
        return channel.send(embed)
    })
}

export async function handleGuildMemberRemove(client, member) {
    let embed = new MessageEmbed()
        .setColor(client.colorWheel.get('RED'))
        .addField('Action', `${client.systeEmojis.get('BACKEND_LEAVE')} Member Left`, false)
        .addField('Username', member.user.username, true)
        .addField('ID', member.user.id, false)
        .addField('Bot?', member.user.bot, true)
        .addField('Discriminator', member.user.discriminator, true)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
    await client.channels.fetch(guildChannelMap.get('joinLogChannel')).then(channel => {
        return channel.send(embed)
    })
}

export async function handleMessageDelete(client, message) {

    if (message.member.id === client.user.id || message.channel.id === guildChannelMap.get('mainLogChannel')) return;

    let embed = new MessageEmbed()
        .setColor(message.member.displayHexColor)
        .setTimestamp()
        .setAuthor(`${message.member.user.tag} (${message.member.user.id})`, message.member.user.displayAvatarURL())
        .setThumbnail(message.member.user.displayAvatarURL())
        .addField('❯ Message ID', message.id)
        .addField('❯ Message Content', message.content)
        .addField('❯ Channel Name', message.channel.name)
        .addField('❯ Channel ID', message.channel.id)
        .addField('❯ Action', 'Message Delete')
    await client.channels.fetch(guildChannelMap.get('messageLogChannel')).then(channel => { return channel.send(embed) })
}

export async function handleVoiceStateUpdate(client, oldState, newState) {

    const channel = oldState.guild.channels.cache.get(guildChannelMap.get('mainLogChannel'))

    if (oldState.id === client.config.botOwnerId) {
        console.log(chalk.green('voiceStateUpdate triggered! Find a logChannel for this.'))
    }
}