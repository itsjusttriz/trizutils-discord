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
        /*        case '?commands':
        if (self) return;
        if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
        if (isOnCooldown(channel, command)) return;
        else {
            setCooldown(channel, command, 10);
            client.say(channel, "Click here for commands, specific to this channel >> https://itsjusttriz.weebly.com/chatbot-" + channel.substr(1));
        }
        client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
        break;*/
	}
}

function handleSub(channel, username, method, message, userstate) {
    let subTier = method.plan.replace('1000', 'Tier 1').replace('2000', 'Tier 2').replace('3000', 'Tier 3')
    
    client.say(channel, `PogChamp New ${subTier} Sub! PogChamp`)
    client.say(channel, '!hearts')
	client.say('#nottriz', `[${channel}] SUB: ${username} (${subTier})`);
}

function handleResub(channel, username, useless, message, userstate, method) {
    let resubTier = method.plan.replace('1000', 'Tier 1').replace('2000', 'Tier 2').replace('3000', 'Tier 3')
    let cumulMonths = `${userstate['msg-param-cumulative-months']} months`
    
	client.say(channel, `PogChamp Returning ${subTier} Sub: ${username} (${cumulMonths}) PogChamp`);
	client.say('#nottriz', `[${channel}] SUB: ${username} - ${cumulMonths} (${resubTier})`);
}

function handleGiftsub(channel, gifter, recipient, method, userstate) {
    let giftsubTier = method.plan.replace('1000', 'Tier 1').replace('2000', 'Tier 2').replace('3000', 'Tier 3')

    //    client.say(channel, `${gifter} -> ${recipient}! (${subTier})`);
	client.say('#nottriz', `[${channel}] GIFTSUB: ${gifter} -> ${recipient} (${giftsubTier})`);
}

function handleCheer(channel, userstate, message) {
	var username = userstate.username;
	var	bits = userstate.bits;

	client.say(channel, 'coxHypers x' + bits);
	client.say('#nottriz', `[${channel}] BITS: ${username} (${bits})`);
}

function handleRaid(customraid) {
	client.say(customraid.channel, `Welcome Raiders from ${customraid.raider}'s channel! <3 GivePLZ`);
	client.say(customraid.channel, `!so ${customraid.raider}`);
	client.say('#nottriz', `[${customraid.channel}] RAID: ${customraid.raider}`);
}

module.exports.handleChat = handleChat;
module.exports.handleSub = handleSub;
module.exports.handleResub = handleResub;
module.exports.handleGiftsub = handleGiftsub;
module.exports.handleCheer = handleCheer;
module.exports.handleRaid = handleRaid;