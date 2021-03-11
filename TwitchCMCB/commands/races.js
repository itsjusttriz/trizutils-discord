import { MoSManager } from "../utils/MoSManager.js";
import { CtrMatches } from "../utils/MatchManager.js";

const allowedChans = ['itsjusttriz'];

export default {
    name: 'races',
    usage: 'n!races [...option]',
    aliases: ['mos', 'race', 'marbles'],
    run(chatClient, message, args, options) {
        if (!options.isBotAdmin && allowedChans.indexOf(options.channel) < 0) return;


        if (args[0]) {
            const x = args[0];

            switch (true) {
                case CtrMatches(/(add|\+|plus)/, x):
                    MoSManager.add(options.channel);
                    break;
                case CtrMatches(/(remove|-|delete|minus)/, x):
                    MoSManager.remove(options.channel);
                    break;
                case CtrMatches(/(set|change)/, x):
                    MoSManager.set(parseInt(args[1], 10), parseInt(args[2], 10), options.channel);
                    break;
                case CtrMatches(/(reset|wipe|clear)/, x):
                    MoSManager.reset(options.channel);
                    break;
            }
        } else return chatClient.say(options.channel, `${MoSManager.counts.current[options.channel]} : ${MoSManager.counts.total[options.channel]}`);

        return chatClient.say(options.logChan, options.logMsg)
    }
}