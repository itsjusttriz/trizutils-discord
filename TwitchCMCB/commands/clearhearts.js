import { HeartsManager } from '../utils/HeartsManager.js';

export default {
    name: 'clearhearts',
    usage: 'n!clearhearts',
    aliases: ['emptyhearts'],
    run(chatClient, message, args, options) {
        if (!options.isBotAdmin) return;

        HeartsManager.clearCache();

        return chatClient.say(options.logChan, options.logMsg);
    }
}