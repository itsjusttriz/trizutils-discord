export default {
    name: "Kick",
    perms: 'Mod only',
    usage: 'n!kick <user-id> OR n!kick <user-mention>',
    description: 'Kicks a targetted member',
    run(client, message, args = [mention, ...reason]) {
        const modRole = message.guild.roles.cache.find(r => r.name.match(/mod/gi));
        if (!modRole)
            return message.reply('Cannot find moderator role. Please report this!')

        if (!message.member.roles.cache.has(modRole.id))
            return message.reply('You do not have the required role, for this command.')

        if (message.mentions.members.size === 0)
            return message.reply('Please mention a user to kick.');

        if (!message.guild.me.hasPermission("KICK_MEMBERS"))
            return message.reply('You must have the KICK_MEMBERS permission to use this command.');

        const target = message.mentions.members.first() || message.guild.members.cache.get(mention);

        if (!target.kickable)
            return message.reply('No.')

        target.kick(reason.join(' ')).then(member => {
            message.reply(`Successfully kicked ${member.user.username}`)
        })
    }
}