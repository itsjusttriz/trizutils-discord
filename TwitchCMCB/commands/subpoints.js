import { default as axios } from 'axios';

async function getSubInfo(chatClient, options, x) {
    const query = await axios({
        "method": "get",
        "url": `https://decapi.me/twitch/subpoints/${x}`
    }).catch(console.error)

    return chatClient.say(options.channel, !(isNaN(query.data)) ? `${x} has ${query.data} Subscriber Point(s).` : `${x} is not authenticated! Please authenticate here and try again - https://nottriz.weebly.com/twitch/subapi`);
}

export default {
    name: 'subpoints',
    usage: 'n!subpoints [channel]',
    aliases: [],
    run(chatClient, message, args, options) {

        if (!options.isModPlus && !options.isBotAdmin) return;

        if (args[0]) {
            getSubInfo(chatClient, options, args[0])
        } else
            getSubInfo(chatClient, options, options.user)

        return chatClient.say(options.logChan, options.logMsg);
    }
}