import { default as axios } from 'axios';

async function getSubInfo(chatClient, options, x) {
    const query = await axios({
        "method": "get",
        "url": `https://modlookup.3v.fi/api/user-totals/${x}`
    }).catch(console.error)

    return chatClient.say(options.channel, `${x} is modded in ${query.data.total} channels.`);
}

export default {
    name: 'modcount',
    usage: 'n!modcount [channel]',
    run(chatClient, message, args, options) {

        if (!options.isModPlus && !options.isBotAdmin) return;

        if (args[0]) {
            getSubInfo(chatClient, options, args[0])
        } else
            getSubInfo(chatClient, options, options.user)

        return chatClient.say(options.logChan, options.logMsg);
    }
}