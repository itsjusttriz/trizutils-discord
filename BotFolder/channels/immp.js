const request = require('request');
const getUrls = require('get-urls');
const client = require('../main.js').client;
const fs = require('fs');
const botAdmin = require('../main.js').botAdmin;
const packlist = require('../DataPull/packlist.js');
const posthearts = require('../externalcommands/hearts.js').hearts;

let cooldown = {};
let deathctr = {'Deaths': 0};
//let substhisstream = {'Normal': 0, 'Gifted': 0, 'Combined': 0};
fs.readFile('./DataPull/Counters/ImmpDeath.txt', 'utf8', function (err, data) {
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

    if (message.match(/respect the grind/i)) {
        client.ban(channel, userstate.username);
    }

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
        case '?multiedit':
        case '?setmulti':
            if (self) return;
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                client.say(channel, '!command edit !multi To support ' + args.join(' ') + ' and myself, click here - https://multistre.am/Immp/' + args.join(' '));
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;
        case '?death':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
            let symbol3 = args[0];
                if (!symbol3) {
                    client.say(channel, `Deaths: ${deathctr.Deaths}`);
                } else if (symbol3 == '+') {
                    deathctr['Deaths'] += 1;
                    client.say(channel, '[Increased] ' + `Deaths: ${deathctr.Deaths}`);
                    client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> Manually Increased Death counter.');
                } else if (symbol3 == '-') {
                    deathctr['Deaths'] += -1;
                    client.say(channel, '[Decreased] ' + `Deaths: ${deathctr.Deaths}`);
                    client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> Manually Decreased Death counter.');
                } else if (symbol3 == 'reset') {
                    deathctr = {'Deaths': 0};
                    client.say(channel, '[Reset] ' + `Deaths: ${deathctr.Deaths}`);
                    client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> Manually cleared Death counter.');
                }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
                fs.writeFile('./DataPull/Counters/ImmpDeath.txt', deathctr['Deaths'], function (err) {
                    if (err) return console.log(err);
                });
            break;
        case '?setdeath':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                deathctr = {'Deaths': Number(args[0]) || 0};
                client.say(channel, '[Set]' + `Deaths: ${deathctr.Deaths}`);
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> Manually set Death counter.');
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
                fs.writeFile('./DataPull/Counters/ImmpDeath.txt', deathctr['Deaths'], function (err) {
                    if (err) return console.log(err);
                });
            break;
/*        case '?migrate':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                if (!args[0]) {
                    client.say(channel, 'Usage: !migrate <username> (checks for a namechange and immediately transfers points balance to new username)');
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
        case '!raid':
            if (userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                if (!args[0]) {
                    client.say(channel, '/w ' + userstate.username + " You've forgotten to specify a raid victim! (e.g. !raid <username>)");
                    client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> Raid Failed. Victim not specified.');
                } else {
                    client.action(channel, "You have been Immplicated!! #ImmpRaid");
                    client.action(channel, "You have been Immplicated!! #ImmpRaid");
                    client.action(channel, "You have been Immplicated!! #ImmpRaid");
                    client.say(channel, "/raid " + args[0]);
                    client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> Raid Succeeded. Raiding: ' + args[0]);
                }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;
    }
}


function handleSub(channel, username, method, message, userstate) {
    if (method.plan == '1000') {
        client.say(channel, username + ', You have been freshly Immplicated! (Tier 1)');
    } else if (method.plan == '2000') {
        client.say(channel, username + ', You have been freshly Immplicated! (Tier 2)');
    } else if (method.plan == '3000') {
        client.say(channel, username + ', You have been freshly Immplicated! (Tier 3)');
    } else if (method.prime) {
        client.say(channel, username + ', You have been freshly Immplicated! (Prime)');
    }
    client.say('#nottriz', '[' + channel + '] SUB: ' + username + ' (' + method.plan + ')');
}

function handleResub(channel, username, useless, message, userstate, method) {
    if (method.plan == '1000') {
        client.say(channel, username + ', You have been Re-Immplicated for ' + userstate['msg-param-cumulative-months'] + ' months! (Tier 1 Resub)');
    } else if (method.plan == '2000') {
        client.say(channel, username + ', You have been Re-Immplicated for ' + userstate['msg-param-cumulative-months'] + ' months! (Tier 2 Resub)');
    } else if (method.plan == '3000') {
        client.say(channel, username + ', You have been Re-Immplicated for ' + userstate['msg-param-cumulative-months'] + ' months! (Tier 3 Resub)');
    } else if (method.prime) {
        client.say(channel, username + ', You have been Re-Immplicated for ' + userstate['msg-param-cumulative-months'] + ' months! (Prime Resub)');
    }
    client.say('#nottriz', '[' + channel + '] RESUB: ' + username + ' - ' + userstate['msg-param-cumulative-months'] + 'months (' + method.plan + ')');
}

function handleGiftsub(channel, gifter, recipient, method, userstate) {
    if (method.plan == '1000') {
        client.say(channel, recipient + ', You have been Immplicated by ' + gifter + '! (Tier 1)');
    } else if (method.plan == '2000') {
        client.say(channel, recipient + ', You have been Immplicated by ' + gifter + '! (Tier 2)');
    } else if (method.plan == '3000') {
        client.say(channel, recipient + ', You have been Immplicated by ' + gifter + '! (Tier 3)');
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