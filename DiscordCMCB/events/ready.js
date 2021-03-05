import chalk from 'chalk';
import * as fs from 'fs';
import * as defaults from '../datapull/defaults.js';
import * as newStream from '../twitchStreams.js';

export default async function (client, message) {
    console.log(chalk.cyan.bold(`===> ${chalk.green.bold('READY!')} <===`))

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

    // @@GrabTwitchToken
    fs.readFile('./twitch-tokens.json', (err, data) => {
        client.twitchTokens = JSON.parse(data);
    });

    setInterval(async () => {
        fs.readFile('./twitch-tokens.json', (err, data) => {
            client.twitchTokens = JSON.parse(data);
        })
    }, 1000 * 60 * 3);

    // @@Live-Announcements
    let liveStreamBool = true;
    let liveStreamTestBool = false;

    // Testing...
    setInterval(() => {
        if (liveStreamTestBool !== true) return;
        newStream.liveStreamAnnouncements(client, 'domosplace', client.config.client_id, client.twitchTokens.accessToken, '768289504603275265', '798753871353741312', '809620514867249183');
    }, 1000 * 5);

    // Real-Deal...
    setInterval(() => {
        if (liveStreamBool !== true) return;
        newStream.liveStreamAnnouncements(client, 'itsjusttriz', client.config.client_id, client.twitchTokens.accessToken, '466402083466379267', '748288027322875976', '770312500951908432', '748288230545162280');
        newStream.liveStreamAnnouncements(client, 'bmwhd1', client.config.client_id, client.twitchTokens.accessToken, '314737648839294986', '780914960401694741', '780915508425261056');
        newStream.liveStreamAnnouncements(client, 'domosplace', client.config.client_id, client.twitchTokens.accessToken, '155849052850880513', '770293246215192617', '770293386942218270', '797241646454407178');
        newStream.liveStreamAnnouncements(client, 'finncapp', client.config.client_id, client.twitchTokens.accessToken, '585627689612869645', '770296176565682266', '770302037169930300', '744403558522159144');
    }, 1000 * 60 * 5);
}