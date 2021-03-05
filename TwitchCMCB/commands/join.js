import { ChannelManager } from '../utils/ChannelManager.js';

export default {
    name: 'join',
    usage: 'n!join <...channels>',
    aliases: ['addchan'],
    run(chatClient, message, args, options) {
        if (!options.isBotAdmin) return;

        args.forEach(chan => {
            ChannelManager.add(chatClient, options, chan);
        });
    }
}