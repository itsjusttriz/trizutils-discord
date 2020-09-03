const request = require('request');
const getUrls = require('get-urls');
const client = require('../main.js').client;
const fs = require('fs');
const botAdmin = require('../main.js').botAdmin
const packlist = require('../DataPull/packlist.js');
const posthearts = require('../externalcommands/hearts.js').hearts;

let cooldown = {};
let deathctr = {'Deaths': 0};
let tools = {'Pickaxes': 0};
//let substhisstream = {'Normal': 0, 'Gifted': 0, 'Combined': 0};
fs.readFile('./DataPull/Counters/RenDeath.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    deathctr['Deaths'] = parseInt(data);
});
fs.readFile('./DataPull/Counters/RenPickaxe.txt', 'utf8', function (err, data) {
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
        case '?song':
            if (self) return;
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
            request('https://www.pretzel.rocks/api/v1/playing/twitch/reninsane', (err, res, body) => {
                if (isOnCooldown(channel, command)) return;
                else {
                    setCooldown(channel, command, 5);
                    client.say(channel, body);
                }
            });
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;
        case '!joinrace':
            if (self) return;
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                if (isOnCooldown(channel, command)) return;
                else {
                    setCooldown(channel, command, 30);
                    client.say(channel, '!joinrace');
                }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;
        case '?setserver':
            if (self) return;
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
            let serverip = args[0];
                if (!serverip) {
                    client.say(channel, 'Usage: !setserver (private/sub/sp)');
                } else if (serverip.toLowerCase() == 'private') {
                    client.say(channel, "!command edit !server Ren is currently playing on a Private Server. Sorry, but this one isn't open to the public.");
                } else if (serverip.toLowerCase() == 'sub') {
                    client.say(channel, "!command edit !server Ren is currently playing on one of his Subservers. You can find the server info on the #Sub_server_details channel in his Discord, if you are a subscriber.");
                } else if (serverip.toLowerCase() == 'sp') {
                    client.say(channel, "Ren is currently playing on a Single Player world. No one can join this world, unfortunately.");
                }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;
        case '?dance':
            if (self) return;
            if (userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                client.say(channel, 'renRare epicSax renRare epicSax renRare epicSax renRare epicSax');
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
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
            break;*/
        case '?doublecc':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
            let doubleccoption = args[0];
                if (!doubleccoption) {
                    client.say(channel, 'Usage: ?doublecc (enable/disable/hotsingle/hotdouble)')
                } else if (doubleccoption == 'disable') {
                    client.say(channel, "!command edit !cc Grab the chance to either torture Ren, or help him! PogChamp CC/GCC = $5 | Ico = $10 renH https://streamlabs.com/reninsane");
                } else if (doubleccoption == 'enable') {
                    client.say(channel, "!command edit !cc Grab the chance to either torture Ren, or help him! PogChamp CC/GCC = $5 | Ico = $10 renH https://streamlabs.com/reninsane (All Chance Cubes are being doubled for today.)");
                } else if (doubleccoption == 'hotsingle') {
                    client.say(channel, "!command edit !cc Grab the chance to either torture Ren, or help him! PogChamp CC/GCC = $5 | Ico = $10 renH https://streamlabs.com/reninsane (Chance to double with HoT)");
                } else if (doubleccoption == 'hotdouble') {
                    client.say(channel, "!command edit !cc Grab the chance to either torture Ren, or help him! PogChamp CC/GCC = $5 | Ico = $10 renH https://streamlabs.com/reninsane (All Chance Cubes are being doubled for today BUT with a chance to double them again with HoT)");
                }
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
                fs.writeFile('./DataPull/Counters/RenDeath.txt', deathctr['Deaths'], function (err) {
                    if (err) return console.log(err);
                });
            break;
        case '?setdeath':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                deathctr = {'Deaths': Number(args[0]) || 0};
                client.say(channel, '[Set] ' + `Deaths: ${deathctr.Deaths}`);
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> Manually set Death counter.');
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
                fs.writeFile('./DataPull/Counters/RenDeath.txt', deathctr['Deaths'], function (err) {
                    if (err) return console.log(err);
                });
            break;
        case '!raid':
            if (userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                if (!args[0]) {
                    client.say(channel, '/w ' + userstate.username + " You've forgotten to specify a raid victim! (e.g. !raid <username>)");
                    client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> Raid Failed. Victim not specified.');
                } else {
                    client.action(channel, "Reninsane welcomes you to the madhouse");
                    client.action(channel, "Reninsane welcomes you to the madhouse");
                    client.action(channel, "Reninsane welcomes you to the madhouse");
                    client.say(channel, "/raid " + args[0]);
                    client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> Raid Succeeded. Raiding: ' + args[0]);
                }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
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
    client.say('#nottriz', '[' + customraid.channel + '] RAID: ' + customraid.raider);
}

module.exports.handleChat = handleChat;
module.exports.handleSub = handleSub;
module.exports.handleResub = handleResub;
module.exports.handleGiftsub = handleGiftsub;
module.exports.handleCheer = handleCheer;
module.exports.handleRaid = handleRaid;