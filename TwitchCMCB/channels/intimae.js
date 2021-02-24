const request = require('request');
const getUrls = require('get-urls');
const client = require('../config.js').client;
const fs = require('fs');
const botAdmin = require('../index.js').botAdmin;

let cooldown = {};

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
        case '?streamanimals':
            if (self) return;
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && trizAlts.indexOf(userstate.username) < 0) return;
                    client.say(channel, 'The aim of the game is to NOT die! Type !join to enter the game and when the timer ends type: !n, !s, !e or !w to go North, South, East or West.');
                    client.say(channel, '**OR** if you dont feel like choosing a direction, type !auto and the game will choose for you.');
                    client.say(channel, 'The game will also show you commands that you can use to advance further! So keep an eye on the stream.');
                    client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;
    }
}

function handleSub(channel, username, method, message, userstate) {
    if (method.plan == '1000') {
        client.say(channel, 'PogChamp New Tier 1 Sub: ' + username + ' PogChamp');
        client.say(channel, '!pineapples add ' + username + ' 1000');
    } else if (method.plan == '2000') {
        client.say(channel, 'PogChamp New Tier 2 Sub: ' + username + ' PogChamp');
        client.say(channel, '!pineapples add ' + username + ' 2000');
    } else if (method.plan == '3000') {
        client.say(channel, 'PogChamp New Tier 3 Sub: ' + username + ' PogChamp');
        client.say(channel, '!pineapples add ' + username + ' 3000');
    } else if (method.prime) {
        client.say(channel, 'PogChamp New Prime Sub: ' + username + ' PogChamp');
        client.say(channel, '!pineapples add ' + username + ' 1000');
    }
    client.say('#nottriz', '[' + channel + '] SUB: ' + username + ' (' + method.plan + ')');
}

function handleResub(channel, username, useless, message, userstate, method) {
    if (method.plan == '1000') {
        client.say(channel, 'PogChamp Returning Tier 1 Sub: ' + username + ' (' + userstate['msg-param-cumulative-months'] + ' months) PogChamp');
        client.say(channel, '!pineapples add ' + username + ' 1000');
    } else if (method.plan == '2000') {
        client.say(channel, 'PogChamp Returning Tier 2 Sub: ' + username + ' (' + userstate['msg-param-cumulative-months'] + ' months) PogChamp');
        client.say(channel, '!pineapples add ' + username + ' 2000');
    } else if (method.plan == '3000') {
        client.say(channel, 'PogChamp Returning Tier 3 Sub: ' + username + ' (' + userstate['msg-param-cumulative-months'] + ' months) PogChamp');
        client.say(channel, '!pineapples add ' + username + ' 3000');
    } else if (method.prime) {
        client.say(channel, 'PogChamp Returning Prime Sub: ' + username + ' (' + userstate['msg-param-cumulative-months'] + ' months) PogChamp');
        client.say(channel, '!pineapples add ' + username + ' 1000');
    }
    client.say('#nottriz', '[' + channel + '] RESUB: ' + username + ' - ' + userstate['msg-param-cumulative-months'] + 'months (' + method.plan + ')');
}

function handleGiftsub(channel, gifter, recipient, method, userstate) {
    if (method.plan == '1000') {
        client.say(channel, gifter + ' -> ' + recipient + '! (Tier 1)');
        client.say(channel, '!pineapples add ' + gifter + ' 1000');
    } else if (method.plan == '2000') {
        client.say(channel, gifter + ' -> ' + recipient + '! (Tier 2)');
        client.say(channel, '!pineapples add ' + gifter + ' 2000');
    } else if (method.plan == '3000') {
        client.say(channel, gifter + ' -> ' + recipient + '! (Tier 3)');
        client.say(channel, '!pineapples add ' + gifter + ' 3000');
    }
    client.say('#nottriz', '[' + channel + '] GIFTSUB: ' + gifter + ' -> ' + recipient + ' (' + method.plan + ')');
}

function handleCheer(channel, userstate, message) {
    var username = userstate.username;
    var bits = userstate.bits;

    client.say(channel, 'PogChamp x' + bits);
    client.say('#nottriz', '[' + channel + '] BITS: ' + username + ' (' + bits + ')');
}

function handleRaid(customraid) {
	client.say(customraid.channel, "Welcome Raiders from " + customraid.raider + "'s channel! <3 GivePLZ");
	client.say(customraid.channel, '!raider ' + customraid.raider);
    client.say('#nottriz', '[' + customraid.channel + '] RAID: ' + customraid.raider);
}

module.exports.handleChat = handleChat;
module.exports.handleSub = handleSub;
module.exports.handleResub = handleResub;
module.exports.handleGiftsub = handleGiftsub;
module.exports.handleCheer = handleCheer;
module.exports.handleRaid = handleRaid;