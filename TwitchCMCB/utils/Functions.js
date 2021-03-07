import { CooldownManager } from '../utils/CooldownManager.js';

export function planToName(plan) {
    const planStrings = {
        "1000": "Tier 1",
        "2000": "Tier 2",
        "3000": "Tier 3",
        "Prime": "Prime"
    };

    return planStrings[plan] ?? "";
}

export function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function BlacklistedTerms(chatClient, channel, user, message, msg) {

    switch (channel) {
        case '#immp':
            if (message.toLowerCase().includes('respect the grind')) {
                chatClient.ban(channel, user, '[CMCB Moderation] Blacklisted Phrase.')
            }
            break;
        case '#jayrockbird':
            if (message.toLowerCase().includes('littlebirdy')) {
                chatClient.say(channel, 'Now you guys can donate here >> https://streamlabs.com/jayrockbird <3 Tips/Donations are NOT required but are VERY much appreciated! GivePLZ');
            }
            break;
    }
}

export function ExtraCommands(chatClient, channel, user, message, msg) {

    const [exCommand, ...exArgs] = message.split(' ');

    switch (exCommand.toLowerCase()) {
        case '!joinrace':
            if (channel === '#reninsane') {
                if (!options.isModPlus && !options.isBotAdmin) return;

                if (CooldownManager.get(exCommand, channel) == true) return;

                chatClient.say(channel, '!joinrace');

                CooldownManager.set(exCommand, channel, true);
                setTimeout(() => {
                    CooldownManager.clear(exCommand, channel);
                    chatClient.say(options.logChan, `${exCommand}'s cooldown has ended in ${channel}.`);
                }, 1000 * 30);

                return chatClient.say(options.logChan, options.logMsg);
            }
            break;
        case '!play':
            if (channel === '#zeroxfusionz') {
                if (!options.isBotAdmin) return;

                if (CooldownManager.get(exCommand, channel) == true) return chatClient.say(channel, 'Cooldown is active.');

                chatClient.say(options.channel, `!play ${randomInt(1, 8)}`);

                CooldownManager.set(exCommand, channel, true);
                setTimeout(() => {
                    CooldownManager.clear(exCommand, channel);
                    chatClient.say(options.logChan, `${exCommand}'s cooldown has ended in ${channel}.`);
                }, 1000 * 60 * 3);

                return chatClient.say(options.logChan, options.logMsg);
            }
            break;
        case '!raid':
            if (channel === '#immp') {
                if (!options.isCaster && !options.isBotAdmin) return;

                if (CooldownManager.get(exCommand, channel) == true) return chatClient.say(channel, 'Cooldown is active.');

                if (!exArgs[0]) return chatClient.say(channel, `${user}, you must specify a raid target! (e.g. !raid ${channel.substr(1)})`);

                chatClient.action(channel, 'You have been Immplicated!! #ImmpRaid');
                chatClient.action(channel, 'You have been Immplicated!! #ImmpRaid');
                chatClient.action(channel, 'You have been Immplicated!! #ImmpRaid');
                chatClient.say(channel, `/raid ${exArgs[0]}`);

                CooldownManager.set(exCommand, channel, true);
                setTimeout(() => {
                    CooldownManager.clear(exCommand, channel);
                    chatClient.say(options.logChan, `${exCommand}'s cooldown has ended in ${channel}.`);
                }, 1000 * 2);

                return chatClient.say(options.logChan, options.logMsg);
            } else if (channel === '#ja_keeler') {
                if (!options.isCaster && !options.isBotAdmin) return;

                if (CooldownManager.get(exCommand, channel) == true) return chatClient.say(channel, 'Cooldown is active.');

                if (!exArgs[0]) return chatClient.say(channel, `${user}, you must specify a raid target! (e.g. !raid ${channel.substr(1)})`);

                chatClient.action(channel, 'Ja_Keeler, He makes you Happy!');
                chatClient.action(channel, 'Ja_Keeler, He makes you Happy!');
                chatClient.action(channel, 'Ja_Keeler, He makes you Happy!');
                chatClient.say(channel, `/raid ${exArgs[0]}`);

                CooldownManager.set(exCommand, channel, true);
                setTimeout(() => {
                    CooldownManager.clear(exCommand, channel);
                    chatClient.say(options.logChan, `${exCommand}'s cooldown has ended in ${channel}.`);
                }, 1000 * 2);

                return chatClient.say(options.logChan, options.logMsg);
            } else if (channel === '#reninsane') {
                if (!options.isCaster && !options.isBotAdmin) return;

                if (CooldownManager.get(exCommand, channel) == true) return chatClient.say(channel, 'Cooldown is active.');

                if (!exArgs[0]) return chatClient.say(channel, `${user}, you must specify a raid target! (e.g. !raid ${channel.substr(1)})`);

                chatClient.action(channel, 'Reninsane welcomes you to the madhouse!')
                chatClient.action(channel, 'Reninsane welcomes you to the madhouse!')
                chatClient.action(channel, 'Reninsane welcomes you to the madhouse!')
                chatClient.say(channel, `/raid ${exArgs[0]}`);

                CooldownManager.set(exCommand, channel, true);
                setTimeout(() => {
                    CooldownManager.clear(exCommand, channel);
                    chatClient.say(options.logChan, `${exCommand}'s cooldown has ended in ${channel}.`);
                }, 1000 * 2);

                return chatClient.say(options.logChan, options.logMsg);
            }
            break;
        case '!speak':
            if (channel === '#matrixis') {
                if (options.isModPlus) return;

                chatClient.deleteMessage(channel, msg);

                return chatClient.say(options.logChan, options.logMsg);
            }
    }
}