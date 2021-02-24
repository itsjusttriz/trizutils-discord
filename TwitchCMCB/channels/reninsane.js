import * as axios from 'axios';
import chalk from 'chalk';
import * as fs from 'fs';
import * as $ from '../datapull/defaults.js';
import { botAdmin } from '../config.js';

const jsonStorageFile = './datapull/JSON-Storage/reninsane.json';
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

        chatClient.say(channel, $.createDefaultCheerMessage(msg))
        chatClient.say($.logChannel, $.createCheerEventLogMessage(channel, user, msg))
    }
    if (message.startsWith('!joinrace')) {
        if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
        if ($.isOnCooldown(channel)) return;
        else {
            chatClient.say(channel, '!joinrace')
            $.setCooldown(channel, cd = 30)
        }
        chatClient.say(channel, $.logChannel, $.createMessageEventLogMessage(channel, user, message))
    } else if (message.startsWith('!raid')) {
        if (!$.isCaster(msg) && botAdmin.indexOf(user) < 0) return;
        if (!$.firstArg(message)) {
            chatClient.say(channel, `@${user}, You need to specify a raid target! (e.g !raid <username>)`)
        } else {
            chatClient.action(channel, 'Reninsane welcomes you to the madhouse!')
            chatClient.action(channel, 'Reninsane welcomes you to the madhouse!')
            chatClient.action(channel, 'Reninsane welcomes you to the madhouse!')
            chatClient.say(channel, `/raid ${$.firstArg(message)}`)
        }
        chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
    }

    switch ($.command(message)) {
        case 'n!song':
            if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
            axios({
                "method": "get",
                "url": "https://www.pretzel.rocks/api/v1/playing/twitch/reninsane"
            })
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                })
            chatClient.say(channel, $.createDisabledCommandMessage(user))
            chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
            break;
        case 'n!setserver':
            if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
            chatClient.say(channel, $.createDisabledCommandMessage(user))
            chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
            break;
        case 'n!pickaxe':
            let pickaxeCtrTag = '[PickaxeCounter]';
            if (!$.firstArg(message)) {
                chatClient.say(channel, `Broken Pickaxes: ${jsonStorageData.Pickaxe}`)
            } else if ($.firstArg(message) === '+') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData["Pickaxe"] += 1;
                chatClient.say(channel, `${pickaxeCtrTag} Increased by 1 to ${jsonStorageData.Pickaxe}.`)
            } else if ($.firstArg(message) === '-') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData["Pickaxe"] += -1;
                chatClient.say(channel, `${pickaxeCtrTag} Decreased by 1 to ${jsonStorageData.Pickaxe}.`)
            } else if ($.firstArg(message) === 'set') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData["Pickaxe"] = Number($.args(message)[1]) || 0;
                chatClient.say(channel, `${pickaxeCtrTag} Set to ${jsonStorageData.Pickaxe}.`)
            } else if ($.firstArg(message) === 'reset') {
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                jsonStorageData["Pickaxe"] = 0;
                chatClient.say(channel, `${pickaxeCtrTag} Reset to ${jsonStorageData.Pickaxe}.`)
            }
            fs.writeFile(jsonStorageFile, JSON.stringify(jsonStorageData), (err) => {
                if (err) return console.log(err)
            })
            chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
            break;
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

    chatClient.say($.logChannel, $.createSubgiftEventLogMessage(channel, user, subInfo))
}

export async function handleRaid(chatClient, channel, user, raidInfo, msg) {

    chatClient.say(channel, $.createDefaultRaidMessage(raidInfo))
    chatClient.say($.logChannel, $.createRaidEventLogMessage(channel, raidInfo))
}