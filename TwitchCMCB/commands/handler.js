import { HandlerManager } from '../utils/HandlerManager.js';

export default {
    name: 'handler',
    usage: 'n!handler toggle/get <event-name>',
    tag: '[HandlerState]',
    aliases: ['handlers', 'module', 'modules', 'event', 'events'],
    run(chatClient, message, args, options) {
        if (!options.isCaster && !options.isBotAdmin) return;
        chatClient.say(options.logChan, options.logMsg);

        if (!args[0]) return chatClient.say(options.channel, 'Missing Parameters!');

        const subComArray = ['toggle', 'get'];
        const optionArray = ['cheer', 'sub', 'resub', 'giftsub', 'raid'];

        if (subComArray.indexOf(args[0]) < 0) return chatClient.say(options.channel, `Invalid syntax! Use 1 of the following subcommands: ${subComArray.join(', ')}`);
        if (optionArray.indexOf(args[1]) < 0) return chatClient.say(options.channel, `Invalid syntax! USe 1 of the following options: ${optionArray.join(', ')}`);

        if (!HandlerManager.has(options.channel, args[1].toLowerCase())) return chatClient.say(options.channel, `Cannot find '${options.channel}' or '${args[1]}' inside the HandlerManager Cache!`);

        switch (args[0]) {
            case 'toggle':
                HandlerManager.toggle(options.channel, args[1].toLowerCase());
                chatClient.say(options.channel, `${this.tag} ${args[1]} set to ${HandlerManager.get(options.channel, args[1].toLowerCase())}.`);
                break;
            case 'get':
                chatClient.say(options.channel, `${this.tag} ${args[1]} is currently ${HandlerManager.get(options.channel, args[1].toLowerCase())}.`);
                break;
        }
    }
};