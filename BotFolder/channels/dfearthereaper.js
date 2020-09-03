const request = require('request');
const getUrls = require('get-urls');
const client = require('../main.js').client;
const fs = require('fs');
const botAdmin = require('../main.js').botAdmin
const packlist = require('../DataPull/packlist.js');

let cooldown = {};
let deathctr = {'Deaths': 0};
//let substhisstream = {'Normal': 0, 'Gifted': 0, 'Combined': 0};
fs.readFile('./DataPull/Counters/FearDeath.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    deathctr['Deaths'] = parseInt(data);
});

function isOnCooldown(channel, command) {
    if (cooldown[channel] && cooldown[channel][command] == true) return true;
    else return false;
}

function setCooldown(channel, command, cd = 5) {
    if (!cooldown[channel]) cooldown[channel] = {};
    cooldown[channel][command] = true;
    setTimeout(function unsetCooldown() {
        cooldown[channel][command] = false;
    }, cd * 1000);
}

function handleChat(channel, userstate, message, self) {
    let command = message.split(' ')[0];
    let args = message.split(' ');
    args.shift();

    switch(command) {
        case '?commands':
            if (self) return;
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
            if (isOnCooldown(channel, command)) return;
            else {
                setCooldown(channel, command, 10);
                client.say(channel, "Click here for commands, specific to this channel >> https://itsjusttriz.weebly.com/chatbot-" + channel.substr(1));
            }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;
        case '?death':
            let symbol3 = args[0];
                if (!symbol3) {
                    client.say(channel, `Deaths: ${deathctr.Deaths}`);
                } else if (symbol3 == '+') {
                    if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                    deathctr['Deaths'] += 1;
                    client.say(channel, '[Increased] ' + `Deaths: ${deathctr.Deaths}`);
                    client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> Manually Increased Death counter.');
                } else if (symbol3 == '-') {
                    if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                    deathctr['Deaths'] += -1;
                    client.say(channel, '[Decreased] ' + `Deaths: ${deathctr.Deaths}`);
                    client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> Manually Decreased Death counter.');
                } else if (symbol3 == 'reset') {
                    if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                    deathctr = {'Deaths': 0};
                    client.say(channel, '[Reset] ' + `Deaths: ${deathctr.Deaths}`);
                    client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> Manually cleared Death counter.');
                }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + symbol3);
                fs.writeFile('./DataPull/Counters/FearDeath.txt', deathctr['Deaths'], function (err) {
                    if (err) return console.log(err);
                });
            break;
        case '?setdeath':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                deathctr = {'Deaths': Number(args[0]) || 0};
                client.say(channel, '[Set] ' + `Deaths: ${deathctr.Deaths}`);
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> Manually set Death counter.');
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + args[0]);
                fs.writeFile('./DataPull/Counters/FearDeath.txt', deathctr['Deaths'], function (err) {
                    if (err) return console.log(err);
                });
            break;
    }
}

function handleSub(channel, username, method, message, userstate) {
    client.say('#nottriz', '[' + channel + '] SUB: ' + username + ' (' + method.plan + ')');
}

function handleResub(channel, username, useless, message, userstate, method) {
    client.say('#nottriz', '[' + channel + '] RESUB: ' + username + ' - ' + userstate['msg-param-cumulative-months'] + 'months (' + method.plan + ')');
}

function handleGiftsub(channel, gifter, recipient, method, userstate) {
    client.say('#nottriz', '[' + channel + '] GIFTSUB: ' + gifter + ' -> ' + recipient + ' (' + method.plan + ')');
}

function handleCheer(channel, userstate, message) {
    var username = userstate.username;
    var bits = userstate.bits;
    
    client.say('#nottriz', '[' + channel + '] BITS: ' + username + ' (' + bits + ')');
}

function handleRaid(customraid) {
    client.say('#nottriz', '[' + customraid.channel + '] RAID: ' + customraid.raider);
}

module.exports.handleChat = handleChat;
module.exports.handleSub = handleSub;
module.exports.handleResub = handleResub;
module.exports.handleGiftsub = handleGiftsub;
module.exports.handleCheer = handleCheer;
module.exports.handleRaid = handleRaid;