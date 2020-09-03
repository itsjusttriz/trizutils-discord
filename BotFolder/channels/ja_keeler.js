const request = require('request');
const getUrls = require('get-urls');
const client = require('../main.js').client;
const fs = require('fs');
const botAdmin = require('../main.js').botAdmin;
const posthearts = require('../externalcommands/hearts.js').hearts;

let cooldown = {};
let deathctr = {'Deaths': 0};
//let substhisstream = {'Normal': 0, 'Gifted': 0, 'Combined': 0};
/*fs.readFile('../DataPull/Counters/JaDeath.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    deathctr['Deaths'] = parseInt(data);
});*/

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
        case '?raid':
            if (self) return;
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
            if (!args[0]) {
                client.say(channel, '/w ' + userstate.username + " You've forgotten to specify a raid victim! (e.g. ?raid <username>)");
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> Raid Failed. Victim not specified.');
            } else {
                client.action(channel, "We are going to pop on over to " + args[0] + " with a raid! https://twitch.tv/" + args[0] + " <3 ");
                client.say(channel, "Here's your message:");
                client.action(channel, "/me Ja_Keeler, He makes you Happy!");
                client.action(channel, "/me Ja_Keeler, He makes you Happy!");
                client.action(channel, "/me Ja_Keeler, He makes you Happy!");
                client.say(channel, '/raid ' + args[0]);
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> Raid Succeeded. Raiding: ' + args[0]);
            }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;
/*        case '?death':
            let symbol = args[0];
                if (!symbol) {
                    if (isOnCooldown(channel, command));
                    else {
                        setCooldown(channel, command, 5);
                        client.say(channel, `Deaths: ${deathctr.Deaths}`);
                    }
                } else if (symbol == '+') {
                    if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                    if (isOnCooldown(channel, command));
                    else {
                        setCooldown(channel, command, 3);
                        deathctr['Deaths'] += 1;
                        client.say(channel, '[Increased] ' + `Deaths: ${deathctr.Deaths}`);
                    }
                } else if (symbol == '-') {
                    if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                    if (isOnCooldown(channel, command));
                    else {
                        setCooldown(channel, command, 3);
                        deathctr['Deaths'] += -1;
                        client.say(channel, '[Decreased] ' + `Deaths: ${deathctr.Deaths}`);
                    }
                } else if (symbol == 'reset') {
                    if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                    deathctr = {'Deaths': 0};
                    client.say(channel, '[Reset] ' + `Deaths: ${deathctr.Deaths}`);
                }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
                fs.writeFile('../DataPull/Counters/JaDeath.txt', deathctr['Deaths'], function (err) {
                    if (err) return console.log(err);
                });
            break;
        case '?setdeath':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                deathctr = {'Deaths': Number(args[0]) || 0};
                client.say(channel, '[Set] ' + `Deaths: ${deathctr.Deaths}`);
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
                fs.writeFile('../DataPull/Counters/JaDeath.txt', deathctr['Deaths'], function (err) {
                    if (err) return console.log(err);
                });
            break;
/*        case '?migrate':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id']) return;
            if (!args[0]) {
                client.say(channel, 'Usage: ?migrate <username> (checks for a namechange and immediately transfers points balance to new username)');
                return;
            }
            request('https://twitch-tools.rootonline.de/username_changelogs_search.php?q=' + args[0] + '&format=json', (err, result, body) => {
                if (err) {
                    console.log('Error checking name change: ' + err);
                    client.say(channel, 'Unable to check name.');
                    return;
                } else {
                    let js = JSON.parse(body);
                    if (js.length == 0) client.say(channel, 'No recent name change.');
                    else {
                        client.say(channel, '!transfer ' + js[0]['username_old'] + ' ' + js[0]['username_new']);
                    }
                }
            });
            client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;*/
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
    client.say(channel, posthearts);
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
    client.say(channel, posthearts);
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
    client.say(channel, posthearts);
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