export default {
    name: 'issues',
    usage: 'n!issues',
    run(chatClient, message, args, options) {

        chatClient.say(options.channel, 'View the current Issue Tracker for the bot here -> http://triz.link/@mscb/github/issues/');

        return chatClient.say(options.logChan, options.logMsg);
    }
}