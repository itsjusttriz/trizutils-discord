export default {
    name: 'settimer',
    usage: 'n!settimer <TimeInSeconds>',
    aliases: ['countdown', 'cd'],
    run(chatClient, message, args, options) {

        if (!options.isModPlus && !options.isBotAdmin) return;

        if (args.length === 1) {
            setTimeout(() => {
                chatClient.say(options.channel, `@${options.user}, ${args[0]}s Timer has ended!`);
                chatClient.say(options.logChan, `[${options.channel}] ${options.user}'s ${args[0]}s Timer has ended!`);
            }, 1000 * args[0]);

            chatClient.say(options.channel, `Timer set for ${args[0]} seconds.`);
        } else
            chatClient.say(options.channel, `${options.user}, you must specify a {TimeInSeconds}.`)

        return chatClient.say(options.logChan, options.logMsg);
    }
}