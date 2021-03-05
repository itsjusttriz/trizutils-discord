function randNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default {
    name: 'randnum',
    usage: 'n!randnum',
    run(chatClient, message, args, options) {

        if (!options.isSubPlus && !options.isModPlus && !options.isBotAdmin) return;

        if (args.length <= 1 || args.length >= 3) {
            chatClient.say(options.channel, `${options.user}, you must specify a {min} and a {max} number.`)
        } else {
            chatClient.say(options.channel, `Random Number between ${args[0]} & ${args[1]} = ${randNum(args[0], args[1])}`);
        }

        return chatClient.say(options.logChan, options.logMsg);
    }
}