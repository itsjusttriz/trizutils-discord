import { emoteList } from '../DB/emoteslist.js';
const listEmotes = [];

export default {
    name: 'emotes',
    usage: 'n!emotes <emoteset>',
    run(chatClient, message, args, options) {
        if (!options.isModPlus && !options.isBotAdmin) return;

        if (args.length > 0 && args.length < 2) {
            chatClient.say(channel, '' + (emoteslist[args[0].toLowerCase()] || `${user}, '${$.firstArg(message)}' isn't a logged emote-set.`));
        } else {
            chatClient.say(options.channel, `${options.user}, please specify an emoteset.`)
        }

        return chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
    }
}