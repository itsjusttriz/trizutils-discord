const request = require('request');
const getUrls = require('get-urls');
const client = require('../main.js').client;
const fs = require('fs');
const botAdmin = require('../main.js').botAdmin
const packlist = require('../DataPull/packlist.js');

let cooldown = {};
//Counters.
let framesctr = {'Complained': 0};
let substhisstream = {'Normal': 0, 'Gifted': 0, 'Combined': 0};
let deathctr = {'Deaths': 0};
fs.readFile('./DataPull/Counters/TrizDeath.txt', 'utf8', function (err, data) {
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
        case '?frames':
        case '?rip':
            if (self) return;
            if (!userstate.subscriber && !userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
            if (isOnCooldown(channel, command)) return;
            else {
                setCooldown(channel, command);
                framesctr['Complained'] += 1;
                client.action(channel, "It seems like we may have dropped frames?! Welp, our internet is shit so there's nothing that can be done about it. " + `Times Complained: ${framesctr.Complained}`);
            }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;
        case '?setmulti':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                client.say(channel, '!editcom !multi Oh look?! A Multi-Stream PogChamp - https://kadgar.net/live/itsjusttriz/' + args[0]);
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
                break;
        case '?raid':
            if (self) return;
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
            if (isOnCooldown(channel, command)) return;
            else {
                setCooldown(channel, command);
                client.action(channel, "We are going to pop on over to " + args[0] + " with a raid! https://twitch.tv/" + args[0] + " <3 ");
                client.say(channel, "Here's your message:");
                client.action(channel, "/me Blades appear out of nowhere, slicing and dicing in every direction! twitchRaid #TrizRaid");
                client.action(channel, "/me Blades appear out of nowhere, slicing and dicing in every direction! twitchRaid #TrizRaid");
                client.action(channel, "/me Blades appear out of nowhere, slicing and dicing in every direction! twitchRaid #TrizRaid");
                client.say(channel, "/raid " + args[0]);
            }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;
 /*       case '?normalsub':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
            let symbol = args[0];
                if (!symbol) {
                    client.say(channel, 'Usage: !normalsub (+/-)');
                } else if (symbol == '+') {
                    substhisstream['Normal'] += 1;
                    substhisstream['Combined'] += 1;
                    client.say(channel, '[Normal Sub Increased] ' + `Normal: ${substhisstream.Normal}, Gifted: ${substhisstream.Gifted}, Combined: ${substhisstream.Combined}`);
                } else if (symbol == '-') {
                    substhisstream['Normal'] += -1;
                    substhisstream['Combined'] += -1;
                    client.say(channel, '[Normal Sub Decreased] ' + `Normal: ${substhisstream.Normal}, Gifted: ${substhisstream.Gifted}, Combined: ${substhisstream.Combined}`);
                }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;
        case '?giftedsub':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
            let symbol2 = args[0];
                if (!symbol2) {
                    client.say(channel, 'Usage: !giftedsub (+/-)');
                } else if (symbol2 == '+') {
                    substhisstream['Gifted'] += 1;
                    substhisstream['Combined'] += 1;
                    client.say(channel, '[Gifted Sub Increased] ' + `Normal: ${substhisstream.Normal}, Gifted: ${substhisstream.Gifted}, Combined: ${substhisstream.Combined}`);
                } else if (symbol2 == '-') {
                    substhisstream['Gifted'] += -1;
                    substhisstream['Combined'] += -1;
                    client.say(channel, '[Gifted Decreased] ' + `Normal: ${substhisstream.Normal}, Gifted: ${substhisstream.Gifted}, Combined: ${substhisstream.Combined}`);
                }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;
        case '?clearsubs':
            if (self) return;
            if (botAdmin.indexOf(userstate.username) < 0) return;
                substhisstream = {'Normal': 0, 'Gifted': 0, 'Combined': 0};
                    client.say(channel, '[Cleared Subs] ' + `Normal: ${substhisstream.Normal}, Gifted: ${substhisstream.Gifted}, Combined: ${substhisstream.Combined}`);
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;
        case '?totalsubs':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                client.say(channel, '[Total Subs] ' + `Normal: ${substhisstream.Normal}, Gifted: ${substhisstream.Gifted}, Combined: ${substhisstream.Combined}`);
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;
        case '?setsubs':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                substhisstream = {'Normal': Number(args[0]) || 0, 'Gifted': Number(args[1]) || 0, 'Combined': Number(args[2]) || 0};
                client.say(channel, '[Updated Subs] ' + `Normal: ${substhisstream.Normal}, Gifted: ${substhisstream.Gifted}, Combined: ${substhisstream.Combined}`);
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;*/
        case '?death':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
            let symbol3 = args[0];
                if (!symbol3) {
                    client.say(channel, `Deaths: ${deathctr.Deaths}`);
                } else if (symbol3 == '+') {
                    deathctr['Deaths'] += 1;
                    client.say(channel, '[Increased] ' + `Deaths: ${deathctr.Deaths}`);
                } else if (symbol3 == '-') {
                    deathctr['Deaths'] += -1;
                    client.say(channel, '[Decreased] ' + `Deaths: ${deathctr.Deaths}`);
                } else if (symbol3 == 'reset') {
                    deathctr = {'Deaths': 0};
                    client.say(channel, '[Reset] ' + `Deaths: ${deathctr.Deaths}`);
                }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
                fs.writeFile('./DataPull/Counters/TrizDeath.txt', deathctr['Deaths'], function (err) {
                    if (err) return console.log(err);
                });
            break;
        case '?setdeath':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                deathctr = {'Deaths': Number(args[0]) || 0};
                client.say(channel, '[Set] ' + `Deaths: ${deathctr.Deaths}`);
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
                fs.writeFile('./DataPull/Counters/TrizDeath.txt', deathctr['Deaths'], function (err) {
                    if (err) return console.log(err);
                });
            break;
    }
}

function handleSub(channel, username, method, message, userstate) {
    if (method.plan == '1000') {
        client.say(channel, 'PogChamp New Tier 1 Sub: ' + username + ' PogChamp');
    } else if (method.plan == '2000') {
        client.say(channel, 'PogChamp New Tier 2 Sub: ' + username + ' PogChamp');
    } else if (method.plan == '3000') {
        client.say(channel, 'PogChamp New Tier 3 Sub: ' + username + ' PogChamp');
    } else if (method.prime) {
        client.say(channel, 'PogChamp New Prime Sub: ' + username + ' PogChamp');
    }
    client.say(channel, '!heartspam');
//    substhisstream['Normal'] += 1;
//    substhisstream['Combined'] += 1;
    client.say('#nottriz', '[' + channel + '] SUB: ' + username + ' (' + method.plan + ')');
}

function handleResub(channel, username, useless, message, userstate, method) {
    if (method.plan == '1000') {
        client.say(channel, 'PogChamp Returning Tier 1 Sub: ' + username + ' (' + userstate['msg-param-cumulative-months'] + ' months) PogChamp');
    } else if (method.plan == '2000') {
        client.say(channel, 'PogChamp Returning Tier 2 Sub: ' + username + ' (' + userstate['msg-param-cumulative-months'] + ' months) PogChamp');
    } else if (method.plan == '3000') {
        client.say(channel, 'PogChamp Returning Tier 3 Sub: ' + username + ' (' + userstate['msg-param-cumulative-months'] + ' months) PogChamp');
    } else if (method.prime) {
        client.say(channel, 'PogChamp Returning Prime Sub: ' + username + ' (' + userstate['msg-param-cumulative-months'] + ' months) PogChamp');
    }
    client.say(channel, '!heartspam');
//    substhisstream['Normal'] += 1;
//    substhisstream['Combined'] += 1;
    client.say('#nottriz', '[' + channel + '] RESUB: ' + username + ' - ' + userstate['msg-param-cumulative-months'] + 'months (' + method.plan + ')');
}

function handleGiftsub(channel, gifter, recipient, method, userstate) {
    if (method.plan == '1000') {
        client.say(channel, gifter + ' -> ' + recipient + '! (Tier 1)');
    } else if (method.plan == '2000') {
        client.say(channel, gifter + ' -> ' + recipient + '! (Tier 2)');
    } else if (method.plan == '3000') {
        client.say(channel, gifter + ' -> ' + recipient + '! (Tier 3)');
    }
    client.say(channel, '!heartspam');
//    substhisstream['Gifted'] += 1;
//    substhisstream['Combined'] += 1;
    client.say('#nottriz', '[' + channel + '] GIFTSUB: ' + gifter + ' -> ' + recipient + ' (' + method.plan + ')');
}

function handleCheer(channel, userstate, message) {
    var username = userstate.username;
    var bits = userstate.bits;
    
    client.say(channel, 'coxHypers x' + bits);
    client.say('#nottriz', '[' + channel + '] BITS: ' + username + ' (' + bits + ')');
}

function handleRaid(customraid) {
	client.say(customraid.channel, "Welcome Raiders from " + customraid.raider + "'s channel! <3 GivePLZ");
	client.say(customraid.channel, '!so ' + customraid.raider);
    client.say('#nottriz', '[' + customraid.channel + '] RAID: ' + customraid.raider);
}

module.exports.handleChat = handleChat;
module.exports.handleSub = handleSub;
module.exports.handleResub = handleResub;
module.exports.handleGiftsub = handleGiftsub;
module.exports.handleCheer = handleCheer;
module.exports.handleRaid = handleRaid;