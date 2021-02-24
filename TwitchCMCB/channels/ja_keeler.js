import * as axios from 'axios';
import chalk from 'chalk';
import * as fs from 'fs';
import * as $ from '../datapull/defaults.js';
import { botAdmin } from '../config.js';

export async function handleMessage(chatClient, channel, user, message, msg) {

    if (msg.isCheer) {

        chatClient.say(channel, $.createDefaultCheerMessage(msg))
        chatClient.say($.logChannel, $.createCheerEventLogMessage(channel, user, msg))
    }
    if (message.startsWith('!raid')) {
        if (!$.isCaster(msg) && botAdmin.indexOf(user) < 0) return;
        if (!$.firstArg(message)) {
            chatClient.say(channel, `@${user}, You need to specify a raid target! (e.g !raid <username>)`)
        } else {
            chatClient.action(channel, 'Ja_Keeler, He makes you Happy!')
            chatClient.action(channel, 'Ja_Keeler, He makes you Happy!')
            chatClient.action(channel, 'Ja_Keeler, He makes you Happy!')
            chatClient.say(channel, `/raid ${$.firstArg(message)}`)
        }
        chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
    }

    switch ($.command(message)) { }
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