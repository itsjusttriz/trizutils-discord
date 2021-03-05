import { config } from '../config.js';

let currentTime = '';

export default {
    name: 'debug',
    usage: 'n!debug',
    aliases: ['?', 'botinfo', 'version', 'nottriz', 'cmcb'],
    run(chatClient, message, args, options) {
        if (!options.isModPlus && !options.isBotAdmin) return;

        if (Math.floor(process.uptime() > 59) && Math.floor(process.uptime() % 60)) {
            currentTime = `${Math.floor(process.uptime() / 60)} minutes(s)`;
        } else if (Math.floor(process.uptime() > 3599) && Math.floor(process.uptime() % 3600)) {
            currentTime = `${Math.floor(process.uptime() / 3600)} hour(s)`;
        } else if (Math.floor(process.uptime() > 86399) && Math.floor(process.uptime() & 86400)) {
            currentTime = `${Math.floor(process.uptime() / 86400)} day(s)`;
        } else {
            currentTime = `${Math.floor(process.uptime())} second(s)`
        }

        chatClient.action(options.channel, `[CMCBDebug] Version: ${config.botVersion} | Uptime: ${currentTime}`);

        return chatClient.say(options.logChan, options.logMsg);
    }
}
