import { TimerManager, TimerRunner } from '../utils/TimerManager.js';

export default {
    name: 'timers',
    usage: 'n!timers <option> [...timerName]',
    requiredArgs: ['enable', 'disable', 'get'],
    aliases: ['timer'],
    run(chatClient, message, args, options) {
        if (!options.isModPlus && !options.isBotAdmin) return;

        if (args.length <= 1 || args.length >= 2) return chatClient.say(options.channel, `${options.user}, you must specify an [option] & a [timerName]! E.g ${this.usage} (Possible options: ${this.requiredArgs?.join(', ')})`);

        switch (args[0]) {
            case 'enable':
                TimerManager.enable(options.channel, args[1]);
                chatClient.action(options.channel, `Attempting to enable '${args[1]}'...`);
                break;
            case 'disable':
                TimerManager.disable(options.channel, args[1]);
                chatClient.action(options.channel, `Attempting to disable '${args[1]}'...`);
                break;
            case 'get':
                chatClient.action(options.channel, `Searching for '${args[1]}' status...`);
                setTimeout(() => {
                    if (TimerManager.get(options.channel, args[1]) == true) {
                        chatClient.say(options.channel, `${options.user}, '${args[1]}' is enabled...`);
                    } else if (TimerManager.get(options.channel, args[1]) == false) {
                        chatClient.say(options.channel, `${options.user}, '${args[1]}' is disabled...`);
                    } else {
                        chatClient.say(options.channel, `${options.user}, cannot find '${args[1]}'...`);
                    }
                }, 1000 * 3);
                break;
        }

        return chatClient.say(options.logChan, options.logMsg);
    }
}