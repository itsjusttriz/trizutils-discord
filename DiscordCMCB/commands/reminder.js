import { MessageEmbed } from "discord.js"

export default {
    name: "reminder",
    usage: "n!reminder <msg>",
    description: 'Posts a fancy embed with the reminder youve asked for.',
    permissions: 'MANAGE_MESSAGES',
    requiredArgs: '[target] <msg>',
    hidden: false,
    async run(client, message, args) {
        message.delete({ timeout: 3000 })

        const remChan = message.guild.channels.cache.find(c => c.name.includes('reminders'))

        if (!remChan) return message.reply('Cannot find `#reminders` channel! Create one, and try again!').then(m => m.delete({ timeout: 10000 }))

        const remTarget = message.content.match(/-target "([^"]*)"/)
        const remMsg = message.content.match(/-msg "([^"]*)"/)

        if (!args[0]) return message.reply(`Missing Parameters: \`${this.requiredArgs}\`.`);

        const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor(message.member.displayHexColor)
            .setTimestamp()
            .addField('Target', remTarget?.[1].toString() ?? message.author.toString())
        if (!remMsg) {
            return message.reply('You cannot add a reminder, without specifying the reminder-msg! (*e.g. `-msg "These are words inside double apostrophes."`*)').then(m => m.delete({ timeout: 5000 }))
        } else {
            embed.addField('Reminder', remMsg?.[1].toString() ?? 'Not Specified')
        }

        return await remChan.send(embed)
    }
}