export default {
    name: 'issues',
    usage: 'n!issues',
    run(chatClient, message, args, options) {

        chatClient.say(options.channel, 'View the current Issue Tracker for the bot here -> https://itsjusttriz.github.io/rd/issues/');

        return chatClient.say(options.logChan, options.logMsg);
    }
}