export default {
    name: 'lockdown',
    usage: 'n!lockdown <option>',
    aliases: ['ld', 'raidmode'],
    run(chatClient, message, args, options) {
        if (!options.isModPlus && !options.isBotAdmin) return;

        if (!args[0]) chatClient.say(options.channel, `Possible options: on, off. (${this.usage})`);

        if (args.length > 0 && args.length < 2) {
            switch (args[0]) {
                case 'on':
                    chatClient.say(options.channel, 'Enabling RaidMode...');
                    chatClient.enableR9k(options.channel);
                    chatClient.enableSlow(options.channel);
                    chatClient.enableFollowersOnly(options.channel, 60);
                    break;
                case 'off':
                    chatClient.say(options.channel, 'Disabling RaidMode...');
                    chatClient.disableR9k(options.channel);
                    chatClient.disableSlow(options.channel);
                    chatClient.disableFollowersOnly(options.channel);
                    break;
            }
        }

        return chatClient.say(options.logChan, options.logMsg);
    }
}