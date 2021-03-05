export default {
    name: 'sudo',
    usage: 'n!sudo <msg>',
    aliases: ['echo', 'say'],
    run(chatClient, message, args, options) {
        if (!options.isBotAdmin) return;

        if (args.length > 0)
            chatClient.say(options.channel, args.join(' '));
        else
            chatClient.say(options.channel, `${options.user}, you must specify a {message} for me to echo!`);

        return chatClient.say(options.logChan, options.logMsg);
    }
}