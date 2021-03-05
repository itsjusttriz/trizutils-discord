import { ChannelManager } from '../utils/ChannelManager.js';

export default {
    name: 'leave',
    usage: 'n!leave <...channels>',
    aliases: ['removechan', 'part'],
    run(chatClient, message, args, options) {
        if (!options.isBotAdmin) return;

        args.forEach(chan => {
            ChannelManager.remove(chatClient, options, chan);
        });
    }
}