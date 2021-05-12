import { default as axios } from 'axios';

export default {
    name: 'time',
    usage: 'n!time',
    aliases: ['triztime', 'uktime'],
    run(chatClient, message, args, options) {
        if (!options.isModPlus && !options.isBotAdmin) return;

        axios({
            'method': 'get',
            'url': 'https://decapi.me/misc/time?timezone=Europe/Dublin'
        }).then(function (response) {
            chatClient.say(options.channel, `Current Time: ${response.data}`);
        }).catch(function (error) {
            console.log(error);
        });

        return chatClient.say(options.logChan, options.logMsg);
    }
};