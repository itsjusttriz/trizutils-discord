import { HeartsManager } from '../utils/HeartsManager.js';

export default {
    name: 'hearts',
    usage: 'n!hearts [option]',
    aliases: ['heartspam'],
    run(chatClient, message, args, options) {
        if (!options.isModPlus && !options.isBotAdmin) return;

        if (args.length >= 1) return;
        chatClient.say(options.channel, `${HeartsManager.heartString.length > 1 ? HeartsManager.heartString.join(' ') : HeartsManager.heartString[0]}`);

        return chatClient.say(options.logChan, options.logMsg);
    }
}