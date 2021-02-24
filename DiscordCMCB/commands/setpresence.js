export default {
    name: "setpresence",
    usage: 'n!setpresence <status> <...activity>',
    description: 'Sets custom status for the bot',
    permissions: '@botOwner',
    hidden: true,
    run(client, message, args) {
        const [pStatus, ...pActivity] = args;

        if (message.author.id !== client.config.botOwnerId) return;

        message.delete({ timeout: 1000 })

        if (!args[0]) {
            return message.reply('Gimme the data m9.');
        } else {
            return client.user.setPresence({
                activity: {
                    name: pActivity.join(' '),
                    type: 0
                },
                status: pStatus
            });
        }
    }
}