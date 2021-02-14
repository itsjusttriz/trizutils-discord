import chalk from 'chalk';
import * as fs from 'fs';
import * as defaults from '../datapull/defaults.js';
import * as newStream from '../twitchStreams.js';

export default function (client, message) {
    console.log(chalk.cyan.bold(`===> ${chalk.green.bold('READY!')} <===`))

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
    setInterval(async function tokenGrabInterval() {
        fs.readFile('./twitch-tokens.json', (err, data) => {
            client.twitchTokens = JSON.parse(data);
        })
    }, 1000 * 60 * 3);
    // @@Live-Announcements
    let liveStreamBool = true;
    let liveStreamTimer = 60 * 5;
    let testTimer = 5;
    setInterval(function testLiveStream() {
        let liveStreamTest = false;
        if (liveStreamTest === true) {
            newStream.liveStreamAnnouncements('domosplace', client.config.client_id, client.twitchTokens.accessToken, 'RED', '768289504603275265', '798753871353741312', '809620514867249183');
        }
    }, 1000 * testTimer);
    // setInterval(function liveStreamInterval() {
    //     if (liveStreamBool == true) {
    //         client.newStream.liveStreamAnnouncements('itsjusttriz', client.config.client_id, client.twitchTokens.accessToken, 'PURPLE', '466402083466379267', '748288027322875976', '770312500951908432', '748288230545162280');
    //         client.newStream.liveStreamAnnouncements('bmwhd1', client.config.client_id, client.twitchTokens.accessToken, 'PURPLE', '314737648839294986', '780914960401694741', '780915508425261056', '314737648839294986');
    //         client.newStream.liveStreamAnnouncements('domosplace', client.config.client_id, client.twitchTokens.accessToken, 'PURPLE', '155849052850880513', '770293246215192617', '770293386942218270', '797241646454407178');
    //         client.newStream.liveStreamAnnouncements('finncapp', client.config.client_id, client.twitchTokens.accessToken, 'PURPLE', '585627689612869645', '770296176565682266', '770302037169930300', '744403558522159144');
    //     } else return;
    // }, 1000 * liveStreamTimer);
}