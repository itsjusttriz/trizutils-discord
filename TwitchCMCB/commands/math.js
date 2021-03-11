import { default as axios } from 'axios';

export default {
    name: 'math',
    usage: 'n!math <sum>',
    aliases: ['calc', 'sum', 'eq'],
    run(chatClient, message, args, options) {
        const _this = this;

        if (!options.isSubPlus && !options.isModPlus && !options.isBotAdmin) return;

        if (args.length === 1) {
            axios({
                "method": "get",
                "url": `http://twitch.center/customapi/math?expr=${encodeURI(args[0]).replace(/\+/g, '%2B')}`
            }).then(function (response) {
                if (response.data === '???') {
                    chatClient.say(options.channel, `${options.user}, you have given an invalid calculation. Please try again! (${_this.usage})`)
                } else
                    chatClient.say(options.channel, `${args[0]} = ${response.data}`)
            }).catch(function (error) {
                console.log(error)
            })
        } else {
            chatClient.say(options.channel, `${options.user}, you have given an invalid calculation. Please try again! (${_this.usage})`)
        }

        return chatClient.say(options.logChan, options.logMsg)
    }
}