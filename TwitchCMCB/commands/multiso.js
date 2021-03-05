export default {
    name: 'multiso',
    usage: 'n!multiso <channel1> <channel2> [...channels]',
    aliases: ['mso'],
    run(chatClient, message, args, options) {
        if (!options.isModPlus && !options.isBotAdmin) return;

        if (args.length < 2) {
            chatClient.say(options.channel, `You must specify at least 2 channels to shout out.`);
        } else {
            chatClient.say(options.channel, "Check out the following nerds! You'll thank me later ;)");
            args.forEach(async streamer => {
                let stream = await options.apiClient.helix.streams.getStreamByUserName(streamer.toLowerCase())

                if (!stream) return chatClient.say(options.channel, `Caster: ${streamer} | Link: https://twitch.tv/${streamer} | Game: Unknown (NOT LIVE)`);

                let caster = (await stream.userDisplayName)
                let game = (await stream.getGame()).name;

                chatClient.say(options.channel, `Caster: ${caster} | Link: https://twitch.tv/${caster} | Game: ${game} (LIVE)`);
            });
        }

        return chatClient.say(options.logChan, options.logMsg)
    }
}