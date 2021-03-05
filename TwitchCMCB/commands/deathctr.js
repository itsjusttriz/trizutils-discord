import { DeathsManager } from '../utils/DeathsManager.js';
import { CtrMatches } from "../utils/MatchManager.js";

export default {
    name: 'deathctr',
    usage: 'n!deathctr [...option]',
    aliases: ['death', 'deaths', 'died', 'rip'],
    run(chatClient, message, args, options) {
        if (!options.isModPlus && !options.isBotAdmin) return;

        if (!(options.channel in DeathsManager.counts)) return;

        if (args[0]) {
            const x = args[0];

            switch (true) {
                case CtrMatches(/(add|\+|plus)/, x):
                    DeathsManager.add(options.channel);
                    chatClient.say(options.channel, `${DeathsManager.tag} Added 1 to the counter! Total: ${DeathsManager.counts[options.channel]}`);
                    break;
                case CtrMatches(/(remove|-|delete|minus)/, x):
                    DeathsManager.remove(options.channel);
                    chatClient.say(options.channel, `${DeathsManager.tag} Removed 1 from the counter! Total: ${DeathsManager.counts[options.channel]}`);
                    break;
                case CtrMatches(/(set|change)/, x):
                    DeathsManager.set(options.channel, parseInt(args[1], 10));
                    chatClient.say(options.channel, `${DeathsManager.tag} Altered the counter! Total: ${DeathsManager.counts[options.channel]}`);
                    break;
                case CtrMatches(/(reset|wipe|clear)/, x):
                    DeathsManager.reset(options.channel);
                    chatClient.say(options.channel, `${DeathsManager.tag} Cleared the counter! Total: ${DeathsManager.counts[options.channel]}`);
                    break;
            }
        } else return chatClient.say(options.channel, `${DeathsManager.tag} Current Total: ${DeathsManager.counts[options.channel]}`);
    }
}