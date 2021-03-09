import { HeartsManager } from '../utils/HeartsManager.js';

export default {
    name: 'reshearts',
    usage: 'n!reshearts',
    aliases: ['reloadhearts', 'refreshhearts'],
    run(chatClient, message, args, options) {
        if (!options.isBotAdmin) return;

        HeartsManager.import();

        return chatClient.say(options.logChan, options.logMsg);
    }
}