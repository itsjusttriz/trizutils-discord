import chalk from 'chalk';
import * as defaults from '../datapull/defaults.js';
import { TwitchTokenManager } from '../util/TwitchTokenManager.js';
import { TwitchStreamManager } from '../util/TwitchStreamManager.js';

export default async function (client) {
    console.log(chalk.cyan.bold(`===> ${chalk.green.bold('READY!')} <===`))

    TwitchTokenManager.import();
    TwitchTokenManager.interval(60 * 3);

    // function getGuildListToConsole(client) {
    //     console.table(client.guilds.cache.reduce((acc, guild) => {
    //         acc[guild.id] = guild.name
    //         return acc
    //     }, {}))
    // }

    // @@setPresence
    setInterval(() => {
        client.user.setPresence({ activity: { name: defaults.randomArrElement(client.activityArray) }, status: defaults.randomArrElement(client.presenceArray) })
            // .then(console.log)
            .catch(console.error);
    }, 1000 * 60);

    // Testing...
    setInterval(() => {
        if (TwitchStreamManager.testing !== true) return;
        TwitchStreamManager.post(client, 'commanderroot', '768289504603275265', '768956331507580948', '824088379796619285');
    }, 1000 * 5);

    // Real-Deal...
    setInterval(() => {
        if (TwitchStreamManager.availability !== true) return;
        TwitchStreamManager.post(client, 'itsjusttriz', '466402083466379267', '748288027322875976', '770312500951908432', '748288230545162280');
        TwitchStreamManager.post(client, 'bmwhd1', '314737648839294986', '780914960401694741', '780915508425261056');
        TwitchStreamManager.post(client, 'domosplace', '155849052850880513', '770293246215192617', '770293386942218270', '797241646454407178');
        TwitchStreamManager.post(client, 'finncapp', '585627689612869645', '770296176565682266', '770302037169930300', '744403558522159144');
        TwitchStreamManager.post(client, 'blitzyuk', '758341730575319120', '827757443118792734', '827757994078502983')
    }, 1000 * 60 * 5);
}