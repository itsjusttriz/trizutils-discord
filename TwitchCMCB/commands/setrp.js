import { resourcePacks as packlist } from '../DB/rplist.js';
const listedPacks = [];

export default {
    name: 'setrp',
    usage: 'n!setrp <resourcepack-name>',
    aliases: ['rpedit', 'editrp'],
    run(chatClient, message, args, options) {
        if (!options.isModPlus && !options.isBotAdmin) return;

        if (!(chatClient.cmdEditGroups.groupOne.indexOf(options.channel) > -1 || chatClient.cmdEditGroups.groupTwo.indexOf(options.channel) > -1 || chatClient.cmdEditGroups.groupThree.indexOf(options.channel) > -1 || chatClient.cmdEditGroups.groupFour.indexOf(options.channel) > -1)) return;

        if ((args.length < 1 && args.length > 1) || !(chatClient.cmdEditGroups.groupOne.indexOf(options.channel) > -1 || chatClient.cmdEditGroups.groupTwo.indexOf(options.channel) > -1 || chatClient.cmdEditGroups.groupThree.indexOf(options.channel) > -1 || chatClient.cmdEditGroups.groupFour.indexOf(options.channel) > -1)) {
            return chatClient.say(options.channel, `${options.user}, you must specify a resource-pack! ${listedPacks.length > 0 ? listedPacks[0] : `[List Unavailable]`}`);
        }

        if (chatClient.cmdEditGroups.groupOne.indexOf(options.channel) > -1) {
            chatClient.say(options.channel, `!command edit !tp ${packlist[args[0].toLowerCase()]}`);
        } else if (chatClient.cmdEditGroups.groupTwo.indexOf(options.channel) > -1) {
            chatClient.say(options.channel, `!editcom !tp ${packlist[args[0].toLowerCase()]}`);
        } else if (chatClient.cmdEditGroups.groupThree.indexOf(options.channel) > -1) {
            chatClient.say(options.channel, `!editcommand !tp ${packlist[args[0].toLowerCase()]}`);
        } else if (chatClient.cmdEditGroups.groupFour.indexOf(options.channel) > -1) {
            chatClient.say(options.channel, `!cmdrs tp ${packlist[args[0].toLowerCase()]}`);
        }

        return chatClient.say(options.logChan, options.logMsg);
    }
}