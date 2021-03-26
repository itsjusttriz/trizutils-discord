const idStorage = [
    {
        guildName: 'nightshade_alley',
        guildId: '466402083466379267',
        roles: [
            {
                roleName: 'Supporter',
                roleId: '770107205394497578'
            }
        ]
    }
]

export default {
    name: "clap",
    usage: `n!clap <msg>`,
    description: 'Echoes your input while replacing spaces with :clap:',
    permissions: 'READ_MESSAGES',
    requiredArgs: '<msg>',
    hidden: true,
    run(client, message, args) {
        // Deletes the triggering command.
        message.delete({ timeout: 3000 })

        // If guild.id does not match an allowedGuildIds element, ignore.
        const guildCheck = idStorage.map(g => g.guildId).indexOf(message.guild.id) >= 0
        if (!guildCheck) return;

        // If guild.id matches 'nightshade_alley' guild.id, check for this...
        if (message.guild.id === idStorage[0].guildId) {
            if (message.author.id !== client.config.botOwnerId && !message.member.roles.cache.has(idStorage[0].roles[0].roleId)) return;
        }

        if (!args[0]) return message.reply(`Missing Parameters: \`${this.requiredArgs}\`.`).then(m => m.delete({ timeout: 3000 }));

        let res = args.join(' ');

        return message.channel.send(res.replace(/ +/g, " :clap: "));
    }
}