import { RefreshableAuthProvider, StaticAuthProvider } from 'twitch-auth';
import { ChatClient } from 'twitch-chat-client';
import { ApiClient } from 'twitch';
import { PubSubClient } from 'twitch-pubsub-client';
import { promises as fs } from 'fs';
import { clientId, botVersion, botAdmin, clientSecret } from './config.js';
import * as $ from "./datapull/defaults.js";
import * as packlist from "./datapull/packlist.js";
import * as emoteslist from "./datapull/emoteslist.js";
import * as rplist from './datapull/rplist.js';
import * as fsnp from 'fs';
import { default as axios } from 'axios';
import * as TimeFormat from 'hh-mm-ss';
import chalk from 'chalk';
import * as heartsSys from './extcmd/hearts.js';

let addedChannels;
const jsonStorageFile = './datapull/JSON-Storage/addedChannels.json';
fsnp.readFile(jsonStorageFile, (err, data) => {
    //    console.log(JSON.parse(data))
    try {
        addedChannels = JSON.parse(data);
    } catch (e) {
        console.log(chalk.red(e));
    }
});

const cmdEditGroups = {
    // Channels that use '!command edit'.
    groupOne: ['#domosplace', '#immp', '#reninsane', '#theimperialbitgod', '#xobias', '#chachava', '#kikiisyourfriend', '#ja_keeler', '#yzulf'],
    // Channels that use '!editcom'.
    groupTwo: ['#jayrockbird', '#queenliz09', '#superfraggle', '#zeroxfusionz', '#vertigo67', '#finncapp', '#masonnnn7'],
    // Channels that use '!editcommand'
    groupThree: ['#blitzyuk'],
    // Channels that use '!cmdr'.
    groupFour: ['#itsjusttriz']
}

import * as almostfae from './channels/almostfae.js';
import * as blitzyuk from './channels/blitzyuk.js';
import * as dfearthereaper from './channels/dfearthereaper.js';
import * as domosplace from './channels/domosplace.js';
import * as finncapp from './channels/finncapp.js';
import * as gwinthor from './channels/gwinthor.js';
import * as immp from './channels/immp.js';
import * as intimae from './channels/intimae.js';
import * as itsjusttriz from './channels/itsjusttriz.js';
import * as ja_keeler from './channels/ja_keeler.js';
import * as jayrockbird from './channels/jayrockbird.js';
import * as kikiisyourfriend from './channels/kikiisyourfriend.js';
import * as matrixis from './channels/matrixis.js';
import * as queenliz09 from './channels/queenliz09.js';
import * as reninsane from './channels/reninsane.js';
import * as rhilou32 from './channels/rhilou32.js';
import * as superfraggle from './channels/superfraggle.js';
import * as techyguy from './channels/techyguy.js';
import * as theimperialbitgod from './channels/theimperialbitgod.js';
import * as tonster46346 from './channels/tonster46346.js';
import * as xobias from './channels/xobias.js';
import * as zeroxfusionz from './channels/zeroxfusionz.js';

async function main() {
    const tokenData = JSON.parse(await fs.readFile('./tokens.json'));
    const auth = new RefreshableAuthProvider(
        new StaticAuthProvider(clientId, tokenData.accessToken),
        {
            clientSecret,
            refreshToken: tokenData.refreshToken,
            expiry: tokenData.expiryTimestamp === null ? null : new Date(tokenData.expiryTimestamp),
            onRefresh: async ({ accessToken, refreshToken, expiryDate }) => {
                const newTokenData = {
                    accessToken,
                    refreshToken,
                    expiryTimestamp: expiryDate === null ? null : expiryDate.getTime()
                };
                await fs.writeFile('./tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8')
                await fs.writeFile('../DiscordCMCB/twitch-tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8')
            }
        }
    );
    // pubSubClient.start()
    const pubSubClient = new PubSubClient();


    // apiClient.start()
    const apiClient = new ApiClient({ authProvider: auth });

    // chatClient.start()
    const chatClient = new ChatClient(auth, { channels: addedChannels.sort() });

    if (!(chatClient.isConnected || chatClient.isConnecting)) {
        await chatClient.connect()
    }

    chatClient.onRegister(() => {
        console.log(chalk.yellow.bold('===> READY <==='));

        setInterval(async function forceTokenPush() {
            const streamInfo = await apiClient.helix.streams.getStreamByUserName('itsjusttriz');
            if (streamInfo) {
                console.log('');
            }
        }, 1000 * 60 * 1);
    })

    chatClient.onJoin((channel, user) => {
        if (user === 'nottriz') {
            console.log(chalk.green(`===> Joined ${channel} <===`));
            chatClient.action('#nottriz', `joined ${channel}`);
        }
    });

    chatClient.onPart((channel, user) => {
        if (user === 'nottriz') {
            console.log(chalk.red(`===> Left ${channel} <===`));
            chatClient.action('#nottriz', `left ${channel}`);
        }
    });

    Array.prototype.random = function () {
        return this[Math.floor((Math.random() * this.length))]
    };

    const nonTurboColors = ['blue', 'blueviolet', 'cadetblue', 'chocolate', 'coral', 'dodgerblue', 'firebrick', 'goldenrod', 'green', 'hotpink', 'orangered', 'red', 'seagreen', 'springgreen', 'yellowgreen'];

    setInterval(function () {
        chatClient.changeColor(nonTurboColors.random());
    }, 1000 * 2);

    chatClient.onMessage(async (channel, user, message, msg) => {
        console.log(`${chalk.blue(`[${channel}]`)} ${chalk.magenta(`<${user}>`)} ${chalk.grey('|')} ${chalk.white.bold(`${message}`)}`)

        heartsSys.onMessage(chatClient, channel, user, message, msg);

        //.onCommand
        if (channel === '#almostfae') {
            almostfae.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#blitzyuk') {
            blitzyuk.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#dfearthereaper') {
            dfearthereaper.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#domosplace') {
            domosplace.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#finncapp') {
            finncapp.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#gwinthor') {
            gwinthor.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#immp') {
            immp.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#intimae') {
            intimae.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#itsjusttriz') {
            itsjusttriz.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#ja_keeler') {
            ja_keeler.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#jayrockbird') {
            jayrockbird.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#kikiisyourfriend') {
            kikiisyourfriend.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#matrixis') {
            matrixis.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#queenliz09') {
            queenliz09.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#reninsane') {
            reninsane.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#rhilou32') {
            rhilou32.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#superfraggle') {
            superfraggle.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#techyguy') {
            techyguy.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#theimperialbitgod') {
            theimperialbitgod.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#tonster46346') {
            tonster46346.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#xobias') {
            xobias.handleMessage(chatClient, channel, user, message, msg)
        } else if (channel === '#zeroxfusionz') {
            zeroxfusionz.handleMessage(chatClient, channel, user, message, msg)
        }

        switch ($.command(message)) {
            // @everyone
            // @subPlusOnly
            case 'n!randnum':
                if (!$.isSubPlus(msg) && !$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                chatClient.say(channel, `[RandomNumber] ${$.randNum($.firstArg(message), $.args(message)[1])}`);
                chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
                break;
            // @modPlusOnly
            case 'n!clip':
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                let clipId = await apiClient.helix.clips.createClip({ channelId: msg.channelId, createAfterDelay: true })
                chatClient.say(channel, `NEW CLIP! https://clips.twitch.tv/${clipId} ~ by ${user}`);
                break;
            // @casterOnly
            case 'n!roadmap':
                if (!$.isCaster(msg) && botAdmin.indexOf(user) < 0) return;
                chatClient.say(channel, 'View the current development roadmap for the bot here -> https://nottriz.weebly.com/roadmap');
                chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message));
                break;
            // @botAdminOnly
            // @botOwnerOnly
            case 'n!mod':
                if (user.toLowerCase() !== 'itsjusttriz') return;
                if ($.firstArg(message) === 'on') {
                    chatClient.mod(channel, user)
                } else if ($.firstArg(message) === 'off') {
                    chatClient.unmod(channel, user)
                }
                chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
                break;
            case 'n!setmulti':
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                chatClient.say(channel, `!command edit !multi Oh look?! A Multi-Stream coxHypers - https://kadgar.net/live/${channel.substr(1)}/${$.args(message).join('/')}`)
                chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
                break;
            case 'n!settimer':
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                setTimeout(function CTimer() {
                    chatClient.say(channel, `@${user}, ${$.firstArg(message)}s Timer has ended!`);
                    chatClient.say($.logChannel, `[${channel}] ${user}'s ${$.firstArg(message)}s Timer has ended!`);
                }, 1000 * $.firstArg(message));
                chatClient.say(channel, `Timer set for ${$.firstArg(message)} seconds.`);
                chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
                break;
            case 'n!triztime':
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                axios({
                    "method": "get",
                    "url": "https://decapi.me/misc/time?timezone=Europe/Dublin"
                })
                    .then(function (response) {
                        chatClient.say(channel, `Current Time: ${response.data}`)
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
                break;
            case 'n!checkfollowcount':
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                axios({
                    "method": "get",
                    "url": `https://decapi.me/twitch/followcount/${$.firstArg(message)}`
                })
                    .then(function (response) {
                        chatClient.say(channel, `${$.firstArg(message)} has ${response.data} followers.`)
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
                chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
                break;
            case 'n!checksubcount':
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                axios({
                    "method": "get",
                    "url": `https://decapi.me/twitch/subcount/${$.firstArg(message)}`
                })
                    .then(function (response) {
                        if (isNaN(response.data)) {
                            chatClient.say(channel, $.noSubApiAuth)
                        } else {
                            chatClient.say(channel, `${$.firstArg(message)} has ${response.data} Subscribers.`)
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
                break;
            case 'n!checksubpoints':
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                axios({
                    "method": "get",
                    "url": `https://decapi.me/twitch/subpoints/${$.firstArg(message)}`
                })
                    .then(function (response) {
                        if (isNaN(response.data)) {
                            chatClient.say(channel, $.noSubApiAuth)
                        } else {
                            chatClient.say(channel, `${$.firstArg(message)} has ${response.data} Sub-Points.`)
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
                break;
            case 'n!checkswordcount':
                if (!$.isCaster(msg) && botAdmin.indexOf(user) < 0) return;
                axios({
                    "method": "get",
                    "url": `https://modlookup.3v.fi/api/user-totals/${$.firstArg(message)}`
                })
                    .then(function (response) {
                        chatClient.say(channel, `${$.firstArg(message)} is modded in ${response.data.total} channels.`)
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
                break;
            case 'n!sudo':
                if (botAdmin.indexOf(user) < 0) return;
                chatClient.say(channel, $.allArgs(message));
                chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
                break;
            case 'n!multiso':
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                if (!$.firstArg(message)) {
                    chatClient.whisper(user, `Usage: ${$.cmdPrefix}multiso <arg> <arg> <etc.>`);
                } else {
                    chatClient.say(channel, "Check out the following nerds! You'll thank me later ;)");
                    $.args(message).forEach(user => {
                        chatClient.say(channel, `${user} - https://twitch.tv/${user}`);
                    });
                }
                chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
                break;
            case 'n!setpack':
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                if (!$.firstArg(message)) {
                    chatClient.whisper(user, `Usage: ${$.cmdPrefix}setpack ${packlist.listpacks}`);
                } else if (cmdEditGroups.groupOne.indexOf(channel) > -1) {
                    if ($.firstArg(message)) {
                        chatClient.say(channel, '!command edit !pack ' + packlist[$.firstArg(message).toLowerCase()]);
                    }
                } else if (cmdEditGroups.groupTwo.indexOf(channel) > -1) {
                    if ($.firstArg(message)) {
                        chatClient.say(channel, '!editcom !pack ' + packlist[$.firstArg(message).toLowerCase()]);
                    }
                } else if (cmdEditGroups.groupThree.indexOf(channel) > -1) {
                    if ($.firstArg(message)) {
                        chatClient.say(channel, '!editcommand !pack ' + packlist[$.firstArg(message).toLowerCase()]);
                    }
                } else if (cmdEditGroups.groupFour.indexOf(channel) > -1) {
                    if ($.firstArg(message)) {
                        chatClient.say(channel, `!cmdr pack ${packlist[$.firstArg(message).toLowerCase()]}`);
                    }
                }
                chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
                break;
            case 'n!setrp':
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                if (!$.firstArg(message)) {
                    chatClient.whisper(user, `Usage: ${$.cmdPrefix}setrp ${rplist.listpacks}`)
                } else if (cmdGroup2.indexOf(channel) > -1) {
                    if ($.firstArg(message)) {
                        chatClient.say(channel, '!editcom !tp ' + rplist[$.firstArg(message).toLowerCase()]);
                    }
                } else if (cmdGroup1.indexOf(channel) > -1) {
                    if ($.firstArg(message)) {
                        chatClient.say(channel, '!command edit !tp ' + rplist[$.firstArg(message).toLowerCase()]);
                    }
                }
                chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
                break;
            case 'n!emotes':
                if (!$.isModPlus(message) && botAdmin.indexOf(user) < 0) return;
                if (!$.firstArg(message)) {
                    chatClient.whisper(user, `Usage: ${$.cmdPrefix}emotes ${emoteslist.listemotes}`);
                } else if ($.firstArg(message)) {
                    chatClient.say(channel, '' + (emoteslist[$.firstArg(message).toLowerCase()] || `${user}, '${$.firstArg(message)}' isn't a logged emote-set.`));
                } else
                    return;
                chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
                break;
            case 'n!lockdown':
            case 'n!ld':
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                if (!$.firstArg(message)) {
                    chatClient.say(channel, 'Usage: !lockdown (on/off)');
                } else if ($.firstArg(message).toLowerCase() == 'on') {
                    chatClient.enableR9k(channel);
                    chatClient.enableSlow(channel);
                    chatClient.enableFollowersOnly(channel, 60);
                    chatClient.action(channel, `Lockdown = ${$.firstArg(message)}`);
                } else if ($.firstArg(message).toLowerCase() == 'off') {
                    chatClient.disableR9k(channel)
                    chatClient.disableSlow(channel)
                    chatClient.disableFollowersOnly(channel)
                    chatClient.action(channel, `Lockdown = ${$.firstArg(message)}`);
                }
                chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
                break;
            case 'n!math':
                if (!$.isSubPlus(msg) && !$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                axios({
                    "method": "get",
                    "url": `http://twitch.center/customapi/math?expr=${encodeURI($.firstArg(message)).replace(/\+/g, '%2B')}`
                })
                    .then(function (response) {
                        chatClient.say(channel, `${$.firstArg(message)} = ${response.data}`)
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
                break;
            case 'n!trizspam':
                if (botAdmin.indexOf(user) < 0) return;
                if (channel === '#button') return;
                let num = $.args(message).shift();
                for (let i = 0; i < num; i++) {
                    setTimeout(function letsbreakchat() {
                        chatClient.say(channel, $.allArgs(message));
                    }, 100 * i);
                }
                chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
                break;
            case 'n!admin':
                if (!$.firstArg(message)) {
                    if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                    chatClient.whisper(user, `Usage: ${$.cmdPrefix}admin ( ? / help / host / kill )`)
                } else if ($.firstArg(message).toLowerCase() === '?') {
                    if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                    chatClient.action(channel, `[NottrizDebug] Version: ${botVersion} | Uptime: ${TimeFormat.fromS(process.uptime(), 'hh:mm:ss')}`)
                } else if ($.firstArg(message).toLowerCase() === 'help') {
                    if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                    chatClient.say(channel, 'Need support? Join the Discord Server - https://nottriz.weebly.com/support')
                } else if ($.firstArg(message).toLowerCase() === 'host') {
                    if (botAdmin.indexOf(user) < 0) return;
                    chatClient.host('itsjusttriz', $.args(message).slice(1)[1] || channel.substr(1));
                    chatClient.host('nottriz', $.args(message).slice(1)[1] || channel.substr(1));
                } else if ($.firstArg(message).toLowerCase() === 'join') {
                    if (botAdmin.indexOf(user) < 0) return;
                    let cArgs = message.split(' ');
                    cArgs.slice(2).forEach(chan => {
                        chatClient.join(chan)
                        addedChannels.push(chan)
                    });
                    fsnp.writeFile(jsonStorageFile, JSON.stringify(addedChannels), (err) => {
                        if (err) return console.log(err)
                    })
                    console.log(addedChannels)
                    chatClient.say(channel, 'Attempting to join Channel(s)...');
                } else if ($.firstArg(message).toLowerCase() === 'leave') {
                    if (botAdmin.indexOf(user) < 0) return;
                    let cArgs = message.split(' ');
                    cArgs.slice(2).forEach(chan => {
                        let chanCheck = addedChannels.indexOf(chan)
                        if (chanCheck !== -1) {
                            chatClient.part(chan);
                            addedChannels.splice(chanCheck, 1);
                            console.log(addedChannels)
                        } else return chatClient.whisper(user, `Cannot part from ${chan}, as I'm not currently connected to it.`)
                    })
                    fsnp.writeFile(jsonStorageFile, JSON.stringify(addedChannels), (err) => {
                        if (err) return console.log(err)
                    });
                    chatClient.say(channel, 'Attempting to leave Channel(s)...');
                    //chatClient.say(channel, disabledCommand)
                } else if ($.firstArg(message).toLowerCase() === 'eval') {
                    if (user !== 'itsjusttriz') return;
                    // console.log(message.split(' ').join(' ').replace('n!admin eval ', ''))
                    const code = message.split(' ').join(' ').replace('n!admin eval ', '');
                    try {
                        const result = eval(code);
                        console.log('EVAL USED:', result);
                    } catch (error) {
                        console.error('Error evaluating', code, error);
                    }
                } else if ($.firstArg(message).toLowerCase() === 'kill') {
                    if (botAdmin.indexOf(user) < 0) return;
                    console.log(`${user} killed me!`)
                    process.exit(0)
                }
                chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
                break;
            case 'n!breakspam':
                if (!$.isModPlus(msg) && botAdmin.indexOf(user) < 0) return;
                let num2 = 5
                for (let i = 0; i < num2; i++) {
                    setTimeout(function breakSpam5() {
                        chatClient.say(channel, 'B R E A K !');
                    }, 100 * i);
                }
                chatClient.say($.logChannel, $.createMessageEventLogMessage(channel, user, message))
                break;
        }
    });

    chatClient.onSub((channel, user, subInfo, msg) => {

        switch (channel) {
            case '#almostfae':
                almostfae.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#blitzyuk':
                blitzyuk.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#dfearthereaper':
                dfearthereaper.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#domosplace':
                domosplace.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#finncapp':
                finncapp.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#gwinthor':
                gwinthor.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#immp':
                immp.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#intimae':
                intimae.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#itsjusttriz':
                itsjusttriz.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#ja_keeler':
                ja_keeler.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#jayrockbird':
                jayrockbird.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#kikiisyourfriend':
                kikiisyourfriend.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#matrixis':
                matrixis.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#queenliz09':
                queenliz09.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#reninsane':
                reninsane.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#rhilou32':
                rhilou32.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#superfraggle':
                superfraggle.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#techyguy':
                techyguy.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#theimperialbitgod':
                theimperialbitgod.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#tonster46346':
                tonster46346.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#xobias':
                xobias.handleSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#zeroxfusionz':
                zeroxfusionz.handleSub(chatClient, channel, user, subInfo, msg)
                break;
        }
    });

    chatClient.onResub((channel, user, subInfo, msg) => {

        switch (channel) {
            case '#almostfae':
                almostfae.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#blitzyuk':
                blitzyuk.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#dfearthereaper':
                dfearthereaper.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#domosplace':
                domosplace.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#finncapp':
                finncapp.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#gwinthor':
                gwinthor.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#immp':
                immp.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#intimae':
                intimae.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#itsjusttriz':
                itsjusttriz.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#ja_keeler':
                ja_keeler.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#jayrockbird':
                jayrockbird.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#kikiisyourfriend':
                kikiisyourfriend.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#matrixis':
                matrixis.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#queenliz09':
                queenliz09.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#reninsane':
                reninsane.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#rhilou32':
                rhilou32.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#superfraggle':
                superfraggle.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#techyguy':
                techyguy.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#theimperialbitgod':
                theimperialbitgod.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#tonster46346':
                tonster46346.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#xobias':
                xobias.handleResub(chatClient, channel, user, subInfo, msg)
                break;
            case '#zeroxfusionz':
                zeroxfusionz.handleResub(chatClient, channel, user, subInfo, msg)
                break;
        }
    });

    chatClient.onSubGift((channel, user, subInfo, msg) => {

        switch (channel) {
            case '#almostfae':
                almostfae.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#blitzyuk':
                blitzyuk.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#dfearthereaper':
                dfearthereaper.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#domosplace':
                domosplace.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#finncapp':
                finncapp.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#gwinthor':
                gwinthor.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#immp':
                immp.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#intimae':
                intimae.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#itsjusttriz':
                itsjusttriz.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#ja_keeler':
                ja_keeler.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#jayrockbird':
                jayrockbird.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#kikiisyourfriend':
                kikiisyourfriend.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#matrixis':
                matrixis.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#queenliz09':
                queenliz09.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#reninsane':
                reninsane.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#rhilou32':
                rhilou32.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#superfraggle':
                superfraggle.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#techyguy':
                techyguy.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#theimperialbitgod':
                theimperialbitgod.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#tonster46346':
                tonster46346.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#xobias':
                xobias.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
            case '#zeroxfusionz':
                zeroxfusionz.handleGiftSub(chatClient, channel, user, subInfo, msg)
                break;
        }
    });

    chatClient.onRaid((channel, user, raidInfo, msg) => {

        switch (channel) {
            case '#almostfae':
                almostfae.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#blitzyuk':
                blitzyuk.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#dfearthereaper':
                dfearthereaper.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#domosplace':
                domosplace.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#finncapp':
                finncapp.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#gwinthor':
                gwinthor.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#immp':
                immp.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#intimae':
                intimae.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#itsjusttriz':
                itsjusttriz.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#ja_keeler':
                ja_keeler.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#jayrockbird':
                jayrockbird.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#kikiisyourfriend':
                kikiisyourfriend.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#matrixis':
                matrixis.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#queenliz09':
                queenliz09.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#reninsane':
                reninsane.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#rhilou32':
                rhilou32.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#superfraggle':
                superfraggle.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#techyguy':
                techyguy.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#theimperialbitgod':
                theimperialbitgod.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#tonster46346':
                tonster46346.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#xobias':
                xobias.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
            case '#zeroxfusionz':
                zeroxfusionz.handleRaid(chatClient, channel, user, raidInfo, msg)
                break;
        }
    });
}

main();