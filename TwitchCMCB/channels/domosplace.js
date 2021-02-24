import { botAdmin } from "../config.js";
import * as $ from '../datapull/defaults.js';
import chalk from "chalk";
import * as fs from "fs";

const jsonStorageFile = './datapull/JSON-Storage/domosplace.json';
let jsonStorageData;
fs.readFile(jsonStorageFile, (err, data) => {
    //    console.log(JSON.parse(data))
    try {
        jsonStorageData = JSON.parse(data);
        console.log(`=== Syncing ${jsonStorageData.Caster}.json ===\n`, jsonStorageData);
    } catch (e) {
        console.log(chalk.red(e));
    }
});

/*
setInterval(function () {
    axios({
        method: 'get',
        url: `https://api.twitch.tv/helix/streams?user_login=domosplace`,
        headers: {
            'Client-ID': `${clientID}`,
            'Authorization': `Bearer ${authorization}`
        }
    })
        .then(function (response) {
            if (response.data.data.length > 0 && response.data.data[0].type === 'live') {
                chatClient.say('domosplace', '/me Running a 90 second ad..');
                chatClient.say('domosplace', '/commercial 90');
                chatClient.say('domosplace', 'Sick of the ads? Subscribe to Domo to get Ad-Free viewing experience while also showing off those really cool emotes! https://twitch.tv/domosplace/subscribe');
            } else
                return;
        })
        .catch(function (error) {
            console.log('Error:', error);
        });
}, 1000 * 60 * 30); //30 Minutes.
//}, 1000 * 5); //Test Time
*/


export async function handleMessage(chatClient, channel, user, message, msg) {

    if (msg.isCheer) {

        chatClient.say(channel, $.createDefaultCheerMessage(msg))
        chatClient.say($.logChannel, $.createCheerEventLogMessage(channel, user, msg))
    }

    switch ($.command(message)) {
        case 'n!fitness':
            let fitnessCtrTag = '[FitnessCounter]';
            let fitnessCtrMap = Object.entries(jsonStorageData.Fitness).map(([type, count]) => `${type}: ${count}`).join(', ');
            if (!$.firstArg(message)) {
                chatClient.say(channel, `${fitnessCtrTag} ` + fitnessCtrMap)
            } else if ($.firstArg(message).startsWith('+')) {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                if ($.firstArg(message).includes('jjs')) {
                    jsonStorageData.Fitness["JJs"] += 1;
                } else if ($.firstArg(message).includes('squats')) {
                    jsonStorageData.Fitness["Squats"] += 1;
                } else if ($.firstArg(message).includes('hoops')) {
                    jsonStorageData.Fitness["Hoops"] += 1;
                }
                chatClient.say(channel, `${fitnessCtrTag} Increased by 1.`)
            } else if ($.firstArg(message).startsWith('-')) {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                if ($.firstArg(message).includes('jjs')) {
                    jsonStorageData.Fitness["JJs"] += -1;
                } else if ($.firstArg(message).includes('squats')) {
                    jsonStorageData.Fitness["Squats"] += -1;
                } else if ($.firstArg(message).includes('hoops')) {
                    jsonStorageData.Fitness["Hoops"] += -1;
                }
                chatClient.say(channel, `${fitnessCtrTag} Decreased by 1.`)
            } else if ($.firstArg(message) === 'set') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData.Fitness["JJs"] = Number($.args(message)[1]) || 0;
                jsonStorageData.Fitness["Squats"] = Number($.args(message)[2]) || 0;
                jsonStorageData.Fitness["Hoops"] = Number($.args(message)[3]) || 0;
                chatClient.say(channel, `${fitnessCtrTag} Set to ${$.args(message).join(', ').replace(`${$.firstArg(message)}, `, '')}.`)
            } else if ($.firstArg(message) === 'reset') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData.Fitness["JJs"] = 0;
                jsonStorageData.Fitness["Squats"] = 0;
                jsonStorageData.Fitness["Hoops"] = 0;
                chatClient.say(channel, `${fitnessCtrTag} Reset to 0, 0, 0.`)
            }
            fs.writeFile(jsonStorageFile, JSON.stringify(jsonStorageData), (err) => {
                if (err) return console.log(err)
            })
            chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
            break;
    }
}

export async function handleSub(chatClient, channel, user, subInfo, msg) {

    chatClient.say(channel, $.createDefaultSubMessage(subInfo))
    chatClient.say($.logChannel, $.createSubEventLogMessage(channel, subInfo))
}

export async function handleResub(chatClient, channel, user, subInfo, msg) {

    chatClient.say(channel, $.createDefaultResubMessage(subInfo))
    chatClient.say($.logChannel, $.createResubEventLogMessage(channel, user, subInfo))
}

export async function handleGiftSub(chatClient, channel, user, subInfo, msg) {

    chatClient.say(channel, $.createDefaultSubgiftMessage(subInfo))
    chatClient.say($.logChannel, $.createSubgiftEventLogMessage(channel, user, subInfo))
}

export async function handleRaid(chatClient, channel, user, raidInfo, msg) {

    chatClient.say(channel, $.createDefaultRaidMessage(raidInfo))
    chatClient.say(channel, `!so ${user}`)
    chatClient.say($.logChannel, $.createRaidEventLogMessage(channel, raidInfo))
}
