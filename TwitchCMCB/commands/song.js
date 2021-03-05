import { default as axios } from 'axios';

export default {
    name: 'song',
    usage: 'n!song',
    aliases: ['currentsong', 'nowplaying', 'music'],
    run(chatClient, message, args, options) {
        if (!options.isModPlus && !options.isBotAdmin) return;

        axios({
            "method": "get",
            "url": `https://www.pretzel.rocks/api/v1/playing/twitch/${options.channel.substr(1)}`
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.error(error)
        })

        chatClient.say(options.channel, options.disabledCommand);

        return chatClient.say(options.logChan, options.logMsg);
    }
}