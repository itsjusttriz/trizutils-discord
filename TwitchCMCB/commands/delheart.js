import { HeartsManager } from '../utils/HeartsManager.js';

export default {
    name: 'delheart',
    usage: 'n!delheart <...hearts>',
    aliases: ['heart-'],
    run(chatClient, message, args, options) {
        if (!options.isBotAdmin) return;

        if (!args[0]) return;

        args.forEach(h => {
            HeartsManager.remove(options, h);
        });

        return chatClient.say(options.logChan, options.logMsg);
    }
}