export default {
    name: 'clip',
    usage: 'n!clip',
    async run(chatClient, message, args, options) {

        if (!options.isModPlus && !options.isBotAdmin) return;

        const streamIsLive = await options.apiClient.helix.streams.getStreamByUserId(options.msg.channelId);

        if (streamIsLive) {
            const clipId = await options.apiClient.helix.clips.createClip({ channelId: streamIsLive.userId, createAfterDelay: true });

            chatClient.say(options.channel, `NEW CLIP! https://clips.twitch.tv/${clipId} ~ by ${options.user}`);
        } else {
            chatClient.say(options.channel, `${options.user}, You cannot create a clip for an offline channel.`);
        }

        return chatClient.say(options.logChan, options.logMsg);
    }
};