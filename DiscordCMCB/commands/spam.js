export default {
    name: "spam",
    usage: "n!spam <number> <...msg>",
    description: 'Spams given input x amount of times',
    run(client, message, args) {

        message.delete({ timeout: 1000 })

        if (message.author.id !== client.config.botOwnerId) return message.channel.send('no.');

        let num = args.shift();

        for (let i = 0; i < num; i++) {
            setTimeout(function letsbreakchat() {
                message.channel.send(args.join(' '));
            }, 100 * i);
        }
    }
}