import { CooldownManager } from '../utils/CooldownManager.js';

export function planToName(plan) {
    const planStrings = {
        '1000': 'Tier 1',
        '2000': 'Tier 2',
        '3000': 'Tier 3',
        'Prime': 'Prime'
    };

    return planStrings[plan] ?? '';
}

export function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function BlacklistedTerms(options) {

    switch (options.channel) {
        case '#immp':
            if (options.message.toLowerCase().includes('respect the grind')) {
                options.chatClient.ban(options.channel, options.user, '[CMCB Moderation] Blacklisted Phrase.');
            }
            break;
        case '#jayrockbird':
            if (options.message.toLowerCase().includes('littlebirdy')) {
                options.chatClient.say(options.channel, 'Now you guys can donate here >> https://streamlabs.com/jayrockbird <3 Tips/Donations are NOT required but are VERY much appreciated! GivePLZ');
            }
            break;
    }
}

export async function ExtraCommands(options) {

    const [exCommand, ...exArgs] = options.message.split(' ');

    switch (exCommand.toLowerCase()) {
        case '!joinrace':
            if (options.channel === '#reninsane') {
                if (!options.isModPlus && !options.isBotAdmin) return;

                if (CooldownManager.get(exCommand, options.channel) == true) return;

                options.chatClient.say(options.channel, '!joinrace');

                CooldownManager.set(exCommand, options.channel, true);
                setTimeout(() => {
                    CooldownManager.clear(exCommand, options.channel);
                    options.chatClient.say(options.logChan, `${exCommand}'s cooldown has ended in ${options.channel}.`);
                }, 1000 * 30);

                return options.chatClient.say(options.logChan, options.logMsg);
            }
            break;
        case '!play':
            if (options.channel === '#zeroxfusionz') {
                if (!options.isBotAdmin) return;

                if (CooldownManager.get(exCommand, options.channel) == true) return options.chatClient.say(options.channel, 'Cooldown is active.');

                options.chatClient.say(options.channel, `!play ${randomInt(1, 8)}`);

                CooldownManager.set(exCommand, options.channel, true);
                setTimeout(() => {
                    CooldownManager.clear(exCommand, options.channel);
                    options.chatClient.say(options.logChan, `${exCommand}'s cooldown has ended in ${options.channel}.`);
                }, 1000 * 60 * 3);

                return options.chatClient.say(options.logChan, options.logMsg);
            }
            break;
        case '!raid':
            if (options.channel === '#immp') {
                if (!options.isCaster && !options.isBotAdmin) return;

                if (CooldownManager.get(exCommand, options.channel) == true) return options.chatClient.say(options.channel, 'Cooldown is active.');

                if (!exArgs[0]) return options.chatClient.say(options.channel, `${options.user}, you must specify a raid target! (e.g. !raid ${options.channel.substr(1)})`);

                options.chatClient.action(options.channel, 'You have been Immplicated!! #ImmpRaid');
                options.chatClient.action(options.channel, 'You have been Immplicated!! #ImmpRaid');
                options.chatClient.action(options.channel, 'You have been Immplicated!! #ImmpRaid');
                options.chatClient.say(options.channel, `/raid ${exArgs[0]}`);

                CooldownManager.set(exCommand, options.channel, true);
                setTimeout(() => {
                    CooldownManager.clear(exCommand, options.channel);
                    options.chatClient.say(options.logChan, `${exCommand}'s cooldown has ended in ${options.channel}.`);
                }, 1000 * 2);

                return options.chatClient.say(options.logChan, options.logMsg);
            } else if (options.channel === '#ja_keeler') {
                if (!options.isCaster && !options.isBotAdmin) return;

                if (CooldownManager.get(exCommand, options.channel) == true) return options.chatClient.say(options.channel, 'Cooldown is active.');

                if (!exArgs[0]) return options.chatClient.say(options.channel, `${options.user}, you must specify a raid target! (e.g. !raid ${options.channel.substr(1)})`);

                options.chatClient.action(options.channel, 'Ja_Keeler, He makes you Happy!');
                options.chatClient.action(options.channel, 'Ja_Keeler, He makes you Happy!');
                options.chatClient.action(options.channel, 'Ja_Keeler, He makes you Happy!');
                options.chatClient.say(options.channel, `/raid ${exArgs[0]}`);

                CooldownManager.set(exCommand, options.channel, true);
                setTimeout(() => {
                    CooldownManager.clear(exCommand, options.channel);
                    options.chatClient.say(options.logChan, `${exCommand}'s cooldown has ended in ${options.channel}.`);
                }, 1000 * 2);

                return options.chatClient.say(options.logChan, options.logMsg);
            } else if (options.channel === '#reninsane') {
                if (!options.isCaster && !options.isBotAdmin) return;

                if (CooldownManager.get(exCommand, options.channel) == true) return options.chatClient.say(options.channel, 'Cooldown is active.');

                if (!exArgs[0]) return options.chatClient.say(options.channel, `${options.user}, you must specify a raid target! (e.g. !raid ${options.channel.substr(1)})`);

                options.chatClient.action(options.channel, 'Reninsane welcomes you to the madhouse!');
                options.chatClient.action(options.channel, 'Reninsane welcomes you to the madhouse!');
                options.chatClient.action(options.channel, 'Reninsane welcomes you to the madhouse!');
                options.chatClient.say(options.channel, `/raid ${exArgs[0]}`);

                CooldownManager.set(exCommand, options.channel, true);
                setTimeout(() => {
                    CooldownManager.clear(exCommand, options.channel);
                    options.chatClient.say(options.logChan, `${exCommand}'s cooldown has ended in ${options.channel}.`);
                }, 1000 * 2);

                return options.chatClient.say(options.logChan, options.logMsg);
            }
            break;
        case '!speak':
            if (options.channel === '#matrixis') {
                if (options.isModPlus) return;

                options.chatClient.deleteMessage(options.channel, options.msg);

                return options.chatClient.say(options.logChan, options.logMsg);
            }
            break;
        case '!hearts':
            await options.chatClient.commands.get('hearts').default.run(options.chatClient, options.message, options.args, options);
            break;
    }
}