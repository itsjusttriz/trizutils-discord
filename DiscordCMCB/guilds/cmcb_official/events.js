import * as Discord from 'discord.js';
import * as $ from '../../datapull/defaults.js';
import * as config from '../../config.js';
import { default as axios } from 'axios';

// Channels
const guildChannelMap = new Map([
    ['mainLogChannel', '768956331507580948'],
    ['roleLogChannel', '775541436577218571'],
    ['joinLogChannel', '775541639703560192']
])

export async function handleGuildMemberUpdate(client, oldMember, newMember) {
    // If the role(s) are present on the old member object but no longer on the new one (i.e role(s) were removed)
    const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
    if (removedRoles.size > 0) {
        console.log(`The roles ${removedRoles.map(r => r.name)} were removed from ${oldMember.displayName} in ${oldMember.guild.name}.`);
        let removedRolesEmbed = new Discord.MessageEmbed()
            .setAuthor(`${oldMember.user.tag}`, oldMember.user.displayAvatarURL())
            .addField(":no_entry: Removed Role", `${removedRoles.map(r => r.name)}`)
            .setFooter(`UserID: ${oldMember.id}`)
            .setTimestamp()
        await client.channels.fetch('775541436577218571').then(channel => {
            channel.send(removedRolesEmbed)
        })
    }
    // If the role(s) are present on the new member object but are not on the old one (i.e role(s) were added)
    const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
    if (addedRoles.size > 0) {
        console.log(`The roles ${addedRoles.map(r => r.name)} were added to ${oldMember.displayName} in ${oldMember.guild.name}.`);
        let addedRolesEmbed = new Discord.MessageEmbed()
            .setAuthor(`${oldMember.user.tag}`, oldMember.user.displayAvatarURL())
            .addField(":white_check_mark: Added Role", `${addedRoles.map(r => r.name)}`)
            .setFooter(`UserID: ${oldMember.id}`)
            .setTimestamp()
        await client.channels.fetch('775541436577218571').then(channel => {
            channel.send(addedRolesEmbed)
        })
    }
}

export async function handleGuildMemberAdd(member) {
    let memberJoinEmbed = new Discord.MessageEmbed()
        .setColor('#42f572')
        .addField('Action', '<:joinServer:770829534793826314> Member Joined', false)
        .addField('Username', member.user.username, true)
        .addField('ID', member.user.id, false)
        .addField('Bot?', member.user.bot, true)
        .addField('Discriminator', member.user.discriminator, true)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
    await client.channels.fetch('775541639703560192').then(channel => {
        channel.send(memberJoinEmbed)
    })
}

export async function handleGuildMemberRemove(member) {
    let memberLeaveEmbed = new Discord.MessageEmbed()
        .setColor('#ff000d')
        .addField('Action', '<:leaveServer:770829554059182090> Member Left', false)
        .addField('Username', member.user.username, true)
        .addField('ID', member.user.id, false)
        .addField('Bot?', member.user.bot, true)
        .addField('Discriminator', member.user.discriminator, true)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
    await client.channels.fetch('775541639703560192').then(channel => {
        channel.send(memberLeaveEmbed)
    })
}