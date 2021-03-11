import { ToolsManager } from '../utils/ToolsManager.js';
import { CtrMatches } from "../utils/MatchManager.js";

export default {
    name: 'shovelctr',
    usage: 'n!shovelctr [...option]',
    aliases: ['shovel'],
    run(chatClient, message, args, options) {
        if (!options.isModPlus && !options.isBotAdmin) return;

        if (!(options.channel in ToolsManager.counts.shovel)) return;

        if (args[0]) {
            const x = args[0];

            switch (true) {
                case CtrMatches(/(add|\+|plus)/, x):
                    ToolsManager.add("shovel", options.channel);
                    chatClient.say(options.channel, `${ToolsManager.tag} Added 1 to Shovel counter! Total: ${ToolsManager.counts.shovel[options.channel]}`);
                    break;
                case CtrMatches(/(remove|-|delete|minus)/, x):
                    ToolsManager.remove("shovel", options.channel);
                    chatClient.say(options.channel, `${ToolsManager.tag} Removed 1 from Shovel counter! Total: ${ToolsManager.counts.shovel[options.channel]}`);
                    break;
                case CtrMatches(/(set|change)/, x):
                    ToolsManager.set("shovel", options.channel, parseInt(args[1], 10));
                    chatClient.say(options.channel, `${ToolsManager.tag} Altered the total of the Shovel counter! Total: ${ToolsManager.counts.shovel[options.channel]}`);
                    break;
                case CtrMatches(/(reset|wipe|clear)/, x):
                    ToolsManager.reset('shovel', options.channel);
                    chatClient.say(options.channel, `${ToolsManager.tag} Cleared Shovel counter! Total: ${ToolsManager.counts.shovel[options.channel]}`);
                    break;
            }
        } else return chatClient.say(options.channel, `${ToolsManager.tag} Current Shovel total: ${ToolsManager.counts.shovel[options.channel]}`);

        return chatClient.say(options.logChan, options.logMsg)
    }
}