import { config } from '../config.js';
import TimeFormat from 'hh-mm-ss';

export default {
    name: 'debug',
    usage: 'n!debug',
    aliases: ['?', 'botinfo', 'version', 'nottriz', 'cmcb'],
    run(chatClient, message, args, options) {
        if (!options.isModPlus && !options.isBotAdmin) return;

        const { heapUsed, heapTotal } = process.memoryUsage();

        chatClient.action(options.channel, `Uptime: ${TimeFormat.fromS(process.uptime(), 'hh:mm:ss')} | Memory Usage: ${[heapUsed, heapTotal].map(n => (n * 1e-6).toFixed(1)).join('/') + 'MB'} | Instance Version: ${config.botVersion} | Node Version: ${process.version}`);

        return chatClient.say(options.logChan, options.logMsg);
    }
};
