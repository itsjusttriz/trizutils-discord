const request = require('request');
const getUrls = require('get-urls');
const client = require('../main.js').client;
const fs = require('fs');
const botAdmin = require('../main.js').botAdmin
const packlist = require('../DataPull/packlist.js');

let cooldown = {};
let deathctr = {'Deaths': 0};
let tools = {'Pickaxes': 0};

fs.readFile('./DataPull/Counters/MatDeath.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    deathctr['Deaths'] = parseInt(data);
});

fs.readFile('./DataPull/Counters/MatPickaxe.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    tools['Pickaxes'] = parseInt(data);
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
        case '?sethome':
            if (self) return;
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
            if (!args[0]) {
                client.say(channel, 'Usage: !sethome <x> <y> <z>');
            } else {
                client.say(channel, "!editcom !home Mat's home is at XYZ: " + args.join(' '));
            }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;
        case '?dance':
            if (self) return;
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                if (isOnCooldown(channel, command)) return;
                else {
                    setCooldown(channel, command, 5);
                    client.say(channel, 'Crabrave headBang pepoLove PepoSabers RainbowPls rareMat RareParrot ricardoFlick');
                }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;
        case '!speak':
            if (self) return;
                client.say(channel, '/timeout ' + userstate.username + ' 1 !speak is for Mods only.');
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;
        case '?death':
            let symbol = args[0];
                if (!deathchoice) {
                    if (isOnCooldown(channel, command));
                    else {
                        setCooldown(channel, command, 5);
                        client.say(channel, `Deaths: ${deathctr.Deaths}`);
                    }
                } else if (deathchoice == '+') {
                    if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                    if (isOnCooldown(channel, command));
                    else {
                        setCooldown(channel, command, 3);
                        deathctr['Deaths'] += 1;
                        client.say(channel, '[Increased] ' + `Deaths: ${deathctr.Deaths}`);
                    }
                } else if (deathchoice == '-') {
                    if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                    if (isOnCooldown(channel, command));
                    else {
                        setCooldown(channel, command, 3);
                        deathctr['Deaths'] += -1;
                        client.say(channel, '[Decreased] ' + `Deaths: ${deathctr.Deaths}`);
                    }
                } else if (deathchoice == 'reset') {
                    if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                    deathctr = {'Deaths': 0};
                    client.say(channel, '[Reset] ' + `Deaths: ${deathctr.Deaths}`);
                }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
                fs.writeFile('./DataPull/Counters/MatDeath.txt', deathctr['Deaths'], function (err) {
                    if (err) return console.log(err);
                });
            break;
        case '?setdeath':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                deathctr = {'Deaths': Number(args[0]) || 0};
                client.say(channel, '[Set] ' + `Deaths: ${deathctr.Deaths}`);
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
                fs.writeFile('./DataPull/Counters/MatDeath.txt', deathctr['Deaths'], function (err) {
                    if (err) return console.log(err);
                });
            break;
        case '?deadpick':
            let pickchoice = args[0];
                if (!pickchoice) {
                    if (isOnCooldown(channel, command));
                    else {
                        setCooldown(channel, command, 5);
                        client.say(channel, `Pickaxes: ${tools.Pickaxes}`);
                    }
                } else if (pickchoice == '+') {
                    if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                    if (isOnCooldown(channel, command));
                    else {
                        setCooldown(channel, command, 3);
                        tools['Pickaxes'] += 1;
                        client.say(channel, '[Increased] ' + `Pickaxes: ${tools.Pickaxes}`);
                    }
                } else if (pickchoice == '-') {
                    if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                    if (isOnCooldown(channel, command));
                    else {
                        setCooldown(channel, command, 3);
                        tools['Pickaxes'] += -1;
                        client.say(channel, '[Decreased] ' + `Pickaxes: ${tools.Pickaxes}`);
                    }
                } else if (pickchoice == 'reset') {
                    if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                    tools = {'Pickaxes': 0};
                    client.say(channel, '[Reset] ' + `Pickaxes: ${tools.Pickaxes}`);
                }
                fs.writeFile('./DataPull/Counters/MatPickaxe.txt', tools['Pickaxes'], function (err) {
                    if (err) return console.log(err);
                });
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + pickchoice);
                break;
        case '?setpick':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                tools = {'Pickaxes': Number(args[0]) || 0};
                client.say(channel, '[Set] ' + `Pickaxes: ${tools.Pickaxes}`);
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + args[0]);
                fs.writeFile('./DataPull/Counters/MatPickaxe.txt', tools['Pickaxes'], function (err) {
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
    
    client.say(channel, 'coxHypers x' + bits);
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