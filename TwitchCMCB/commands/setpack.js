import { packlist } from '../DB/packlist.js';
const listedPacks = [];

export default {
    name: 'setpack',
    usage: 'n!setpack <packname>',
    aliases: ['editpack', 'packedit'],
    run(chatClient, message, args, options) {
        if (!options.isModPlus && !options.isBotAdmin) return;

        if (args.length < 1 && args.length > 1) {
            return chatClient.say(options.channel, `${options.user}, you must specify a pack! ${listedPacks.length > 0 ? listedPacks[0] : `[List Unavailable]`}`);
        }

        if (chatClient.cmdEditGroups.groupOne.indexOf(options.channel) > -1) {
            chatClient.say(options.channel, `!command edit !pack ${packlist[args[0].toLowerCase()]}`);
        } else if (chatClient.cmdEditGroups.groupTwo.indexOf(options.channel) > -1) {
            chatClient.say(options.channel, `!editcom !pack ${packlist[args[0].toLowerCase()]}`);
        } else if (chatClient.cmdEditGroups.groupThree.indexOf(options.channel) > -1) {
            chatClient.say(options.channel, `!editcommand !pack ${packlist[args[0].toLowerCase()]}`);
        } else if (chatClient.cmdEditGroups.groupFour.indexOf(options.channel) > -1) {
            chatClient.say(options.channel, `!cmdrs pack ${packlist[args[0].toLowerCase()]}`);
        }

        return chatClient.say(options.logChan, options.logMsg);
    }
}