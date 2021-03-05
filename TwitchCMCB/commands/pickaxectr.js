import { ToolsManager } from '../utils/ToolsManager.js';
import { CtrMatches } from "../utils/MatchManager.js";

export default {
    name: 'pickaxectr',
    usage: 'n!pickaxectr [...option]',
    aliases: ['pickaxe'],
    run(chatClient, message, args, options) {
        if (!options.isModPlus && !options.isBotAdmin) return;

        if (!(options.channel in ToolsManager.counts.pickaxe)) return;

        if (args[0]) {
            const x = args[0];

            switch (true) {
                case CtrMatches(/(add|\+|plus)/, x):
                    ToolsManager.add("pickaxe", options.channel);
                    chatClient.say(options.channel, `${ToolsManager.tag} Added 1 to Pickaxe counter! Total: ${ToolsManager.counts.pickaxe[options.channel]}`);
                    break;
                case CtrMatches(/(remove|-|delete|minus)/, x):
                    ToolsManager.remove("pickaxe", options.channel);
                    chatClient.say(options.channel, `${ToolsManager.tag} Removed 1 from Pickaxe counter! Total: ${ToolsManager.counts.pickaxe[options.channel]}`);
                    break;
                case CtrMatches(/(set|change)/, x):
                    ToolsManager.set("pickaxe", options.channel, parseInt(args[1], 10));
                    chatClient.say(options.channel, `${ToolsManager.tag} Altered the total of the Pickaxe counter! Total: ${ToolsManager.counts.pickaxe[options.channel]}`);
                    break;
                case CtrMatches(/(reset|wipe|clear)/, x):
                    ToolsManager.reset('pickaxe', options.channel);
                    chatClient.say(options.channel, `${ToolsManager.tag} Cleared Pickaxe counter! Total: ${ToolsManager.counts.pickaxe[options.channel]}`);
                    break;
            }
        } else return chatClient.say(options.channel, `${ToolsManager.tag} Current Pickaxe total: ${ToolsManager.counts.pickaxe[options.channel]}`);
    }
}