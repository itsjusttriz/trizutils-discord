import { HeartsManager } from '../utils/HeartsManager.js';

export default {
    name: 'addheart',
    usage: 'n!addheart <...hearts>',
    aliases: ['heart+'],
    run(chatClient, message, args, options) {
        if (!options.isBotAdmin) return;

        if (!args[0]) return;

        args.forEach(h => {
            HeartsManager.add(options, h);
        });

        return chatClient.say(options.logChan, options.logMsg);
    }
};