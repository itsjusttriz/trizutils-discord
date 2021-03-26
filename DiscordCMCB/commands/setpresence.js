export default {
    name: "setpresence",
    usage: 'n!setpresence <status> <...activity>',
    description: 'Sets custom status for the bot',
    permissions: '@botOwner',
    requiredArgs: '<status> <activity>',
    hidden: true,
    run(client, message, args) {
        const [pStatus, ...pActivity] = args;

        if (message.author.id !== client.config.botOwnerId) return;

        message.delete({ timeout: 1000 })

        if (!args[0]) {
            return message.reply(`Missing Parameters: \`${this.requiredArgs}\`.`);
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