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
                let findUser = await options.apiClient.helix.users.getUserByName(streamer.toLowerCase()) || null;
                let findChannel = await options.apiClient.helix.channels.getChannelInfo(findUser?.id) || null;

                if (!findUser) return chatClient.say(options.channel, `User not found: ${streamer}`);

                if (!findChannel) return chatClient.say(options.channel, `Channel not found: ${streamer}`);

                return chatClient.say(options.channel, `Caster: ${findChannel?.displayName} | Link: https://twitch.tv/${findChannel?.name} | Latest Category: ${findChannel?.gameName}`);
            });
        }

        return chatClient.say(options.logChan, options.logMsg)
    }
}