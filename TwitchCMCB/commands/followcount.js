import { default as axios } from 'axios';

async function getFollowCount(chatClient, options, x) {
    const query = await axios({
        "method": "get",
        "url": `https://decapi.me/twitch/followcount/${x}`
    }).catch(console.error);

    return chatClient.say(options.channel, `${x} has ${query.data} followers`);
}

export default {
    name: 'followcount',
    usage: 'n!followcount [channel]',
    aliases: ['follows', 'followers'],
    run(chatClient, message, args, options) {
        if (!options.isModPlus && !options.isBotAdmin) return;

        if (args[0]) {
            getFollowCount(chatClient, options, args[0]);
        } else
            getFollowCount(chatClient, options, options.user);

        return chatClient.say(options.logChan, options.logMsg);
    }
}