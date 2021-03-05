export default {
    name: 'setmulti',
    usage: 'n!setmulti',
    aliases: ['editmulti', 'multiedit'],
    run(chatClient, message, args, options) {
        if (!options.isModPlus && !options.isBotAdmin) return;

        if (chatClient.cmdEditGroups.groupOne.indexOf(options.channel) > -1) {
            chatClient.say(options.channel, `!command edit !multi Oh look?! A Multi-Stream PogChamp - https://kadgar.net/live/${options.channel.substr(1)}/${args.join('/')}`);
        } else if (chatClient.cmdEditGroups.groupTwo.indexOf(options.channel) > -1) {
            chatClient.say(options.channel, `!editcom !multi Oh look?! A Multi-Stream PogChamp - https://kadgar.net/live/${options.channel.substr(1)}/${args.join('/')}`);
        } else if (chatClient.cmdEditGroups.groupThree.indexOf(options.channel) > -1) {
            chatClient.say(options.channel, `!editcommand !multi Oh look?! A Multi-Stream PogChamp - https://kadgar.net/live/${options.channel.substr(1)}/${args.join('/')}`);
        } else if (chatClient.cmdEditGroups.groupFour.indexOf(options.channel) > -1) {
            chatClient.say(options.channel, `!cmdrs multi Oh look?! A Multi-Stream PogChamp - https://kadgar.net/live/${options.channel.substr(1)}/${args.join('/')}`);
        } else
            chatClient.say(options.channel, `${options.user}, cannot alter the !multi command as ${options.channel.substr(1)}'s "edit" command is not stored in DB.`);

        return chatClient.say(options.logChan, options.logMsg);
    }
}