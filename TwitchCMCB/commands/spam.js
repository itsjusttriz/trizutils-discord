const ignoreChan = ['button'];

export default {
    name: 'spam',
    usage: 'n!spam <amount> <msg>',
    run(chatClient, message, args, options) {
        if (!options.isBotAdmin && ignoreChan.indexOf(channel) > -1) return;

        if (!args[0] || isNaN(args[0]) || args.length < 2) {
            chatClient.say(options.channel, `${options.user}, please specify a number first, then a message. (${this.usage})`);
        } else {
            let num = args.shift();
            for (let i = 0; i < num; i++) {
                setTimeout(() => {
                    chatClient.say(options.channel, args.join(' '));
                }, 100 * i);
            }
        }

        return chatClient.say(options.logChan, options.logMsg);
    }
}