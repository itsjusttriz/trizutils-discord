const request = require('request');
const getUrls = require('get-urls');
const client = require('../main.js').client;
const fs = require('fs');
const botAdmin = require('../main.js').botAdmin;
const packlist = require('../DataPull/packlist.js');
const posthearts = require('../externalcommands/hearts.js').hearts;

let cooldown = {};
let substhisstream = {'Normal': 0, 'Gifted': 0, 'Combined': 0};
let tools = {'Pickaxes': 0};
let deathctr = {'Deaths': 0};
fs.readFile('./DataPull/Counters/FinnDeath.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    deathctr['Deaths'] = parseInt(data);
});

fs.readFile('./DataPull/Counters/FinnPickaxe.txt', 'utf8', function (err, data) {
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
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + args[0]);
            break;
        case '?multiedit':
        case '?setmulti':
            if (self) return;
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                client.say(channel, '!editcom !multi Click this link to watch both streams! http://kadgar.net/live/finncapp/' + args.join(' '));
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + args[0]);
            break;
        case '?normalsub':
            if (userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
            let symbol = args[0];
                if (!symbol) {
                    client.say(channel, 'Usage: ?normalsub (+/-)');
                } else if (symbol == '+') {
                    substhisstream['Normal'] += 1;
                    substhisstream['Combined'] += 1;
                    client.say(channel, '[Normal Sub Increased] ' + `Normal: ${substhisstream.Normal}, Gifted: ${substhisstream.Gifted}, Combined: ${substhisstream.Combined}`);
                } else if (symbol == '-') {
                    substhisstream['Normal'] += -1;
                    substhisstream['Combined'] += -1;
                    client.say(channel, '[Normal Sub Decreased] ' + `Normal: ${substhisstream.Normal}, Gifted: ${substhisstream.Gifted}, Combined: ${substhisstream.Combined}`);
                }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + args[0]);
            break;
        case '?giftedsub':
            if (userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
            let symbol2 = args[0];
                if (!symbol2) {
                    client.say(channel, 'Usage: ?giftedsub (+/-)');
                } else if (symbol2 == '+') {
                    substhisstream['Gifted'] += 1;
                    substhisstream['Combined'] += 1;
                    client.say(channel, '[Gifted Sub Increased] ' + `Normal: ${substhisstream.Normal}, Gifted: ${substhisstream.Gifted}, Combined: ${substhisstream.Combined}`);
                } else if (symbol2 == '-') {
                    substhisstream['Gifted'] += -1;
                    substhisstream['Combined'] += -1;
                    client.say(channel, '[Gifted Decreased] ' + `Normal: ${substhisstream.Normal}, Gifted: ${substhisstream.Gifted}, Combined: ${substhisstream.Combined}`);
                }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + args[0]);
            break;
        case '?clearsubs':
            if (self) return;
            if (userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                substhisstream = {'Normal': 0, 'Gifted': 0, 'Combined': 0};
                    client.say(channel, '[Cleared Subs] ' + `Normal: ${substhisstream.Normal}, Gifted: ${substhisstream.Gifted}, Combined: ${substhisstream.Combined}`);
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + args[0]);
            break;
        case '?totalsubs':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                client.say(channel, '[Total Subs] ' + `Normal: ${substhisstream.Normal}, Gifted: ${substhisstream.Gifted}, Combined: ${substhisstream.Combined}`);
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + args[0]);
            break;
        case '?setsubs':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                substhisstream = {'Normal': Number(args[0]) || 0, 'Gifted': Number(args[1]) || 0, 'Combined': Number(args[2]) || 0};
                client.say(channel, '[Updated Subs] ' + `Normal: ${substhisstream.Normal}, Gifted: ${substhisstream.Gifted}, Combined: ${substhisstream.Combined}`);
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + args[0]);
            break;
        case '?death':
        case '?deaths':
            let symbol3 = args[0];
                if (!symbol3) {
                    client.say(channel, `Deaths: ${deathctr.Deaths}`);
                } else if (symbol3 == '+') {
                    if (!userstate.mod && !userstate.vip && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                    deathctr['Deaths'] += 1;
                    client.say(channel, '[Increased] ' + `Deaths: ${deathctr.Deaths}`);
                } else if (symbol3 == '-') {
                    if (!userstate.mod && !userstate.vip && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                    deathctr['Deaths'] += -1;
                    client.say(channel, '[Decreased] ' + `Deaths: ${deathctr.Deaths}`);
                } else if (symbol3 == 'reset') {
                    if (!userstate.mod && !userstate.vip && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                    deathctr = {'Deaths': 0};
                    client.say(channel, '[Reset] ' + `Deaths: ${deathctr.Deaths}`);
                }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + args[0]);
                fs.writeFile('./DataPull/Counters/FinnDeath.txt', deathctr['Deaths'], function (err) {
                    if (err) return console.log(err);
                });
            break;
        case '?setdeath':
            if (!userstate.mod && !userstate.vip && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                deathctr = {'Deaths': Number(args[0]) || 0};
                client.say(channel, '[Set] ' + `Deaths: ${deathctr.Deaths}`);
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + args[0]);
                fs.writeFile('./DataPull/Counters/FinnDeath.txt', deathctr['Deaths'], function (err) {
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
                fs.writeFile('./DataPull/Counters/FinnPickaxe.txt', tools['Pickaxes'], function (err) {
                    if (err) return console.log(err);
                });
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + pickchoice);
                break;
        case '?setpick':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                tools = {'Pickaxes': Number(args[0]) || 0};
                client.say(channel, '[Set] ' + `Pickaxes: ${tools.Pickaxes}`);
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + args[0]);
                fs.writeFile('./DataPull/Counters/FinnPickaxe.txt', tools['Pickaxes'], function (err) {
                    if (err) return console.log(err);
                });
            break;
        case '!so':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id']) return;
            let soargs = args[0];
                if (soargs.toLowerCase() == 'dfearthereaper') {
                    client.say(channel, '/w ' + userstate.username + ' Psst.. DFearTheReaper doesnt like being shouted out - https://discordapp.com/channels/585627689612869645/586460891814428693/745354449668538529');
                }
                else
                    return;
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + args[0]);
            break;
    }
}

function handleSub(channel, username, method, message, userstate) {
    if (method.plan == '1000') {
        client.say(channel, 'PogChamp New Tier 1 Sub: ' + username + ' PogChamp');
        substhisstream['Normal'] += 1;
        substhisstream['Combined'] += 1;
    } else if (method.plan == '2000') {
        client.say(channel, 'PogChamp New Tier 2 Sub: ' + username + ' PogChamp');
        substhisstream['Normal'] += 1;
        substhisstream['Combined'] += 1;
    } else if (method.plan == '3000') {
        client.say(channel, 'PogChamp New Tier 3 Sub: ' + username + ' PogChamp');
        substhisstream['Normal'] += 1;
        substhisstream['Combined'] += 1;
    } else if (method.prime) {
        client.say(channel, 'PogChamp New Prime Sub: ' + username + ' PogChamp');
        substhisstream['Normal'] += 1;
        substhisstream['Combined'] += 1;
    }
    client.say(channel, posthearts);
    client.say('#nottriz', '[' + channel + '] SUB: ' + username + ' (' + method.plan + ')');
}

function handleResub(channel, username, useless, message, userstate, method) {
    if (method.plan == '1000') {
        client.say(channel, 'PogChamp Returning Tier 1 Sub: ' + username + ' (' + userstate['msg-param-cumulative-months'] + ' months) PogChamp');
        substhisstream['Normal'] += 1;
        substhisstream['Combined'] += 1;
    } else if (method.plan == '2000') {
        client.say(channel, 'PogChamp Returning Tier 2 Sub: ' + username + ' (' + userstate['msg-param-cumulative-months'] + ' months) PogChamp');
        substhisstream['Normal'] += 1;
        substhisstream['Combined'] += 1;
    } else if (method.plan == '3000') {
        client.say(channel, 'PogChamp Returning Tier 3 Sub: ' + username + ' (' + userstate['msg-param-cumulative-months'] + ' months) PogChamp');
        substhisstream['Normal'] += 1;
        substhisstream['Combined'] += 1;
    } else if (method.prime) {
        client.say(channel, 'PogChamp Returning Prime Sub: ' + username + ' (' + userstate['msg-param-cumulative-months'] + ' months) PogChamp');
        substhisstream['Normal'] += 1;
        substhisstream['Combined'] += 1;
    }
    client.say(channel, posthearts);
    client.say('#nottriz', '[' + channel + '] RESUB: ' + username + ' - ' + userstate['msg-param-cumulative-months'] + 'months (' + method.plan + ')');
}

function handleGiftsub(channel, gifter, recipient, method, userstate) {
    if (method.plan == '1000') {
//      client.say(channel,  gifter + ' -> ' + recipient + '! (Tier 1)');
//      client.say(channel, '!heartspam');
        substhisstream['Gifted'] += 1;
        substhisstream['Combined'] += 1;
    } else if (method.plan == '2000') {
//      client.say(channel,  gifter + ' -> ' + recipient + '! (Tier 2)');
//      client.say(channel, '!heartspam');
        substhisstream['Gifted'] += 1;
        substhisstream['Combined'] += 1;
    } else if (method.plan == '3000') {
//      client.say(channel,  gifter + ' -> ' + recipient + '! (Tier 3)');
//      client.say(channel, '!heartspam');
        substhisstream['Gifted'] += 1;
        substhisstream['Combined'] += 1;
    }
    if (recipient == 'nottriz') {
        client.say('#nottriz', '!addheart finncaLove');
    }
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
    client.say(customraid.channel, '!raided ' + customraid.raider);
    client.say('#nottriz', '[' + customraid.channel + '] RAID: ' + customraid.raider);
}

module.exports.handleChat = handleChat;
module.exports.handleSub = handleSub;
module.exports.handleResub = handleResub;
module.exports.handleGiftsub = handleGiftsub;
module.exports.handleCheer = handleCheer;
module.exports.handleRaid = handleRaid;