export default {
    name: "Kick",
    usage: 'n!kick <user-id> OR n!kick <user-mention>',
    description: 'Kicks a targetted member',
    permissions: ['KICK_MEMBERS'],
    hidden: false,
    run(client, message, args) {

        const [mention, ...reason] = args;

        message.delete({ timeout: 3000 });

        if (message.author.id !== client.config.botOwnerId && this.permissions.indexOf(message.member.permissions) < 0) return message.reply(`You must have one of the following permissions to use this command: \`${this.permissions.join(' | ')}\``).then(m => m.delete({ timeout: 1000 * 10 }))

        const target = message.mentions.members.first() || message.guild.members.cache.get(mention);

        if (!target)
            return message.reply('Please mention a user to kick.').then(m => m.delete({ timeout: 5000 }));

        if (!target.kickable)
            return message.reply('You cannot kick this member.').then(m => m.delete({ timeout: 5000 }));

        target.kick(reason.join(' ')).then(member => {
            message.reply(`Successfully kicked ${member.user.username}`).then(m => m.delete({ timeout: 5000 }));
        })
    }
}