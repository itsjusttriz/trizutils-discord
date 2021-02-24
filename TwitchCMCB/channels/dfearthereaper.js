import { botAdmin } from "../config.js";
import * as $ from '../datapull/defaults.js';
import * as fs from 'fs';

const jsonStorageFile = './datapull/JSON-Storage/dfearthereaper.json';
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

export async function handleMessage(chatClient, channel, user, message, msg) {

    if (msg.isCheer) {

        chatClient.say($.logChannel, $.createCheerEventLogMessage(channel, user, msg))
    }

    switch ($.command(message)) {
        case 'n!death':
            let deathCtrTag = '[DeathCounter]';
            if (!$.firstArg(message)) {
                chatClient.say(channel, `Current Deaths: ${jsonStorageData.Deaths}`)
            } else if ($.firstArg(message).toLowerCase() === '+') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData["Deaths"] += 1;
                chatClient.say(channel, `${deathCtrTag} Increased by 1 to ${jsonStorageData.Deaths}.`)
            } else if ($.firstArg(message).toLowerCase() === '-') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData["Deaths"] += -1;
                chatClient.say(channel, `${deathCtrTag} Decreased by 1 to ${jsonStorageData.Deaths}.`)
            } else if ($.firstArg(message).toLowerCase() === 'set') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData["Deaths"] = Number($.firstArg(message)[1]) || 0;
                chatClient.say(channel, `${deathCtrTag} Set to ${jsonStorageData.Deaths}.`)
            } else if ($.firstArg(message).toLowerCase() === 'reset') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData["Deaths"] = 0;
                chatClient.say(channel, `${deathCtrTag} Reset to ${jsonStorageData.Deaths}.`)
            }
            fs.writeFile(jsonStorageFile, JSON.stringify(jsonStorageData), (err) => {
                if (err) return console.log(err)
            })
            chatClient.say($.logCommand, $.createMessageEventLogMessage(channel, user, message))
            break;
    }
}

export async function handleSub(chatClient, channel, user, subInfo, msg) {

    chatClient.say($.logChannel, $.createSubEventLogMessage(channel, subInfo))
}

export async function handleResub(chatClient, channel, user, subInfo, msg) {

    chatClient.say($.logChannel, $.createResubEventLogMessage(channel, user, subInfo))
}

export async function handleGiftSub(chatClient, channel, user, subInfo, msg) {

    chatClient.say($.logChannel, $.createSubgiftEventLogMessage(channel, user, subInfo))
}

export async function handleRaid(chatClient, channel, user, raidInfo, msg) {

    chatClient.say($.logChannel, $.createRaidEventLogMessage(channel, raidInfo))
}