export default {
    name: 'breakspam',
    usage: 'n!breakspam',
    aliases: ['break'],
    run(chatClient, message, args, options) {
        if (!options.isModPlus && !options.isBotAdmin) return;

        let num = 5
        for (let i = 0; i < num; i++) {
            setTimeout(() => {
                chatClient.say(options.channel, 'B R E A K !');
            }, 100 * i);
        }

        return chatClient.say(options.logChan, options.logMsg)
    }
}