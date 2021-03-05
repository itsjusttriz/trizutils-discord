export default {
    name: 'mod',
    usage: 'n!mod',
    run(chatClient, message, args, options) {
        if (options.channel.substr(1) !== options.logChan && user.toLowerCase() !== 'itsjusttriz') return;

        if (args[0]) {
            switch (args[0]) {
                case 'on':
                    chatClient.mod(options.channel, options.user);
                    break;
                case 'off':
                    chatClient.unmod(options.channel, options.user);
                    break;
                default:
                    chatClient.say(options.channel, `${options.user}, You must specify 'on' or 'off'!`);
            }
        } else {
            chatClient.say(options.channel, `${options.user}, You must specify 'on' or 'off'!`);
        }

        return chatClient.say(options.logChan, options.logMsg);
    }
}