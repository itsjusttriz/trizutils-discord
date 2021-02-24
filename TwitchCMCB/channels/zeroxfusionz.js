import * as axios from 'axios';
import chalk from 'chalk';
import * as fs from 'fs';
import * as $ from '../datapull/defaults.js';
import { botAdmin } from '../config.js';

const jsonStorageFile = './datapull/JSON-Storage/zeroxfusionz.json';
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
    if (message.includes('!play')) {
        if (botAdmin.indexOf(user) < 0) return;
        chatClient.say(channel, '!play')
        chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
    }

    switch ($.command(message)) {
        case 'n!death':
            let deathCtrTag = '[DeathCounter]';
            if (!$.firstArg(message)) {
                chatClient.say(channel, `Current Deaths: ${jsonStorageData.Deaths}`)
            } else if ($.firstArg(message) === '+') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData["Deaths"] += 1;
                chatClient.say(channel, `${deathCtrTag} Increased by 1 to ${jsonStorageData.Deaths}.`)
            } else if ($.firstArg(message) === '-') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData["Deaths"] += -1;
                chatClient.say(channel, `${deathCtrTag} Decreased by 1 to ${jsonStorageData.Deaths}.`)
            } else if ($.firstArg(message) === 'set') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData["Deaths"] = Number($.args(message)[1]) || 0;
                chatClient.say(channel, `${deathCtrTag} Set to ${jsonStorageData.Deaths}.`)
            } else if ($.firstArg(message) === 'reset') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData["Deaths"] = 0;
                chatClient.say(channel, `${deathCtrTag} Reset to ${jsonStorageData.Deaths}.`)
            }
            fs.writeFile(jsonStorageFile, JSON.stringify(jsonStorageData), (err) => {
                if (err) return console.log(err)
            })
            chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
            break;
        case 'n!races':
            let mosCtrTag = '[MoSCounter]';
            let mosCtrMap = Object.entries(jsonStorageData.MoS).map(([type, count]) => `${type}: ${count}`).join(', ');
            if (!$.firstArg(message)) {
                chatClient.say(channel, `${mosCtrTag} ` + mosCtrMap)
            } else if ($.firstArg(message) === '+') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData.MoS["Current"] += 1;
                chatClient.say(channel, `${mosCtrTag} Increased by 1.`)
            } else if ($.firstArg(message) === '-') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData.MoS["Current"] += -1;
                chatClient.say(channel, `${mosCtrTag} Decreased by 1.`)
            } else if ($.firstArg(message) === 'set') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData.MoS["Current"] = Number($.args(message)[1]) || 0;
                jsonStorageData.MoS["Total"] = Number($.args(message)[2]) || 0;
                chatClient.say(channel, `${mosCtrTag} Set to ${args.join(', ').replace(`${$.firstArg(message)}, `, '')}.`)
            } else if ($.firstArg(message) === 'reset') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData.MoS["Current"] = 0;
                jsonStorageData.MoS["Total"] = 0;
                chatClient.say(channel, `${mosCtrTag} Reset to 0, 0.`)
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
    chatClient.say($.logChannel, $.createRaidEventLogMessage(channel, raidInfo))
}