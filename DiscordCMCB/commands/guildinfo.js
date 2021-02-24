import { MessageEmbed } from "discord.js";

export default {
    name: "guildinfo",
    usage: "n!guildinfo",
    description: 'Shows necessary Guild Info',
    permissions: 'MANAGE_GUILD',
    hidden: false,
    run(client, message, args) {
        message.delete({ timeout: 1000 });

        if (message.author.id !== client.config.botOwnerId && this.permissions.indexOf(message.member.permissions) < 0) return message.reply(`You must have one of the following permissions to use this command: \`${this.permissions}\``).then(m => m.delete({ timeout: 1000 * 10 }))

        const embed = new MessageEmbed()
            .setFooter('Server Information')
            .setTimestamp()
            .setColor(message.member.displayHexColor)

        if (!args[0]) {

            const currentGuild = {
                chanArr: [
                    `• Text Channels: ${message.guild.channels.cache.filter(c => c.type === 'text').size}`,
                    `• Announcement Channels: ${message.guild.channels.cache.filter(c => c.type === 'news').size}`,
                    `• Voice Channels: ${message.guild.channels.cache.filter(c => c.type === 'voice').size}`,
                    `• AFK Timeout: ${message.guild.afkTimeout} seconds`
                ],
                memArr: [
                    `• MemberCount: ${message.guild.memberCount}`,
                    `• Owner: ${message.guild.owner.user.tag}`
                ],
                otherArr: [
                    `• Roles: ${message.guild.roles.cache.map(r => r).length}`,
                    `• Region: ${message.guild.region}`,
                    `• Created At: ${message.guild.createdAt}`,
                    `• Verification Level: ${message.guild.verificationLevel}`
                ]
            }

            embed.setAuthor(`${message.guild.name} (${message.guild.id})`, message.guild.iconURL())
            embed.setThumbnail(message.guild.iconURL())
            embed.addField('❯ Channel', currentGuild.chanArr.join('\n'))
            embed.addField('❯ Member', currentGuild.memArr.join('\n'))
            embed.addField('❯ Other', currentGuild.otherArr.join('\n'))
            return message.channel.send(embed)
        } else {

            const guild = client.guilds.cache.get(args[0]);

            const chosenGuild = {
                chanArr: [
                    `• Text Channels: ${guild.channels.cache.filter(c => c.type === 'text').size}`,
                    `• Announcement Channels: ${guild.channels.cache.filter(c => c.type === 'news').size}`,
                    `• Voice Channels: ${guild.channels.cache.filter(c => c.type === 'voice').size}`,
                    `• AFK Timeout: ${guild.afkTimeout} seconds`
                ],
                memArr: [
                    `• MemberCount: ${guild.memberCount}`,
                    `• Owner: ${guild.owner.user.tag}`
                ],
                otherArr: [
                    `• Roles: ${guild.roles.cache.map(r => r).length}`,
                    `• Region: ${guild.region}`,
                    `• Created At: ${guild.createdAt}`,
                    `• Verification Level: ${guild.verificationLevel}`
                ]
            }

            embed.setAuthor(`${guild.name} (${guild.id})`, guild.iconURL())
            embed.setThumbnail(guild.iconURL())
            embed.addField('❯ Channel', chosenGuild.chanArr.join('\n'))
            embed.addField('❯ Member', chosenGuild.memArr.join('\n'))
            embed.addField('❯ Other', chosenGuild.otherArr.join('\n'))
            return message.channel.send(embed)
        }
    }
}