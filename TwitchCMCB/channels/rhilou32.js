import * as axios from 'axios';
import chalk from 'chalk';
import * as fs from 'fs';
import * as $ from '../datapull/defaults.js';
import { botAdmin } from '../config.js';

export async function handleMessage(chatClient, channel, user, message, msg) {

    if (msg.isCheer) {

        chatClient.say($.logChannel, $.createCheerEventLogMessage(channel, user, msg))
    }

    switch ($.command(message)) { }
}

export async function handleSub(chatClient, channel, user, subInfo, msg) {

    chatClient.say($.logChannel, $.createSubEventLogMessage(channel, subInfo))
}

export async function handleResub(chatClient, channel, user, subInfo, msg) {

    chatClient.say($.logChannel, logResubEvent)
}

export async function handleGiftSub(chatClient, channel, user, subInfo, msg) {

    chatClient.say($.logChannel, $.createSubgiftEventLogMessage(channel, user, subInfo))
}

export async function handleRaid(chatClient, channel, user, raidInfo, msg) {

    chatClient.say($.logChannel, $.createRaidEventLogMessage(channel, raidInfo))
}