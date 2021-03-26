export default {
    name: "spam",
    usage: "n!spam <number> <...msg>",
    description: 'Spams given input x amount of times',
    permissions: '@botOwner',
    requiredArgs: '<number> <msg>',
    hidden: true,
    run(client, message, args) {

        message.delete({ timeout: 1000 })

        if (message.author.id !== client.config.botOwnerId) return message.channel.send('no.');

        if (!args[0]) return message.reply(`Missing Parameters: \`${this.requiredArgs}\`.`);

        let num = args.shift();

        for (let i = 0; i < num; i++) {
            setTimeout(function letsbreakchat() {
                message.channel.send(args.join(' '));
            }, 100 * i);
        }
    }
}