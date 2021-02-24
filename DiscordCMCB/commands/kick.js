export default {
    name: "Kick",
    usage: 'n!kick <user-id> OR n!kick <user-mention>',
    description: 'Kicks a targetted member',
    permissions: ['KICK_MEMBERS'],
    hidden: false,
    run(client, message, args = [mention, ...reason]) {
        message.delete({ timeout: 3000 });

        if (message.author.id !== client.config.botOwnerId && this.permissions.indexOf(message.member.permissions) < 0) return message.reply(`You must have one of the following permissions to use this command: \`${this.permissions.join(' | ')}\``).then(m => m.delete({ timeout: 1000 * 10 }))

        if (message.mentions.members.size === 0)
            return message.reply('Please mention a user to kick.');

        const target = message.mentions.members.first() || message.guild.members.cache.get(mention);

        if (!target.kickable)
            return message.reply('No.')

        target.kick(reason.join(' ')).then(member => {
            message.reply(`Successfully kicked ${member.user.username}`)
        })
    }
}