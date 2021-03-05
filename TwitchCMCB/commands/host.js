export default {
    name: 'host',
    usage: 'n!host <channel>',
    aliases: ['h'],
    run(chatClient, message, args, options) {
        if (!options.isBotAdmin) return;

        if (args.length <= 1) {
            chatClient.host('itsjusttriz', args.length ? args[0] : options.channel.substr(1));
            chatClient.host('nottriz', args.length ? args[0] : options.channel.substr(1));
            chatClient.say('itsjusttriz', this.setHosting(args.length ? args[0] : options.channel.substr(1)));
        } else {
            chatClient.say(options.channel, `${options.user}, you can only choose 1 channel to host. Leave blank for current channel.`)
        }

        return chatClient.say(options.logChan, options.logMsg);
    },
    setHosting(x) {
        return `!cmdrs hosting Currently hosting ${x}! Check them out here -> https://twitch.tv/${x}`
    }
}