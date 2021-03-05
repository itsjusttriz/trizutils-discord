export default {
    name: 'roadmap',
    usage: 'n!roadmap',
    run(chatClient, message, args, options) {

        if (!options.isCaster && !options.isBotAdmin) return;

        chatClient.say(options.channel, 'View the current development roadmap for the bot here -> https://itsjusttriz.github.io/rd/roadmap/');

        return chatClient.say(options.logChan, options.logMsg);
    }
}