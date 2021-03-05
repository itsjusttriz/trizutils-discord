export default {
    name: 'help',
    usage: 'n!help',
    aliases: ['support'],
    async run(chatClient, message, args, options) {
        if (!options.isModPlus && !options.isBotAdmin) return;

        chatClient.say(options.channel, 'Need support? Join the Discord Server - https://nottriz.weebly.com/support')

        return chatClient.say(options.logChan, options.logMsg);
    }
}