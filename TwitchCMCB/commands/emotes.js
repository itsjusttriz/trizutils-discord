import { emoteList } from '../DB/emoteslist.js';
const listEmotes = [];

export default {
    name: 'emotes',
    usage: 'n!emotes <emoteset>',
    run(chatClient, message, args, options) {
        if (!options.isModPlus && !options.isBotAdmin) return;

        if (args.length > 0 && args.length < 2) {
            chatClient.say(options.channel, '' + (emoteList[args[0].toLowerCase()] || `${options.user}, '${args[0]}' isn't a logged emote-set.`));
        } else {
            chatClient.say(options.channel, `${options.user}, please specify an emoteset.`)
        }

        return chatClient.say(options.logChan, options.logMsg)
    }
}