const request = require('request');
const getUrls = require('get-urls');
const client = require('../config.js').client;
const fs = require('fs');
const botAdmin = require('../main.js').botAdmin;

let cooldown = {};
let deathctr = {'Deaths': 0};
let mosctr = {'Current': 0, 'Total': 0};

fs.readFile('./DataPull/Counters/zeroxfusionz/deathctr.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    deathctr['Deaths'] = parseInt(data);
});

fs.readFile('./DataPull/Counters/zeroxfusionz/mosCurrent.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    mosctr['Current'] = parseInt(data);
});

fs.readFile('./DataPull/Counters/zeroxfusionz/mosTotal.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    mosctr['Total'] = parseInt(data);
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
                fs.writeFile('./DataPull/Counters/zeroxfusionz/deathctr.txt', deathctr['Deaths'], function (err) {
				    if (err) return console.log(err);
				});
            break;
        case '?setdeath':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                deathctr = {'Deaths': Number(args[0]) || 0};
                client.say(channel, '[Set] ' + `Deaths: ${deathctr.Deaths}`);
				client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> Manually set Death counter.');
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + args[0]);
                fs.writeFile('./DataPull/Counters/zeroxfusionz/deathctr.txt', deathctr['Deaths'], function (err) {
				    if (err) return console.log(err);
				});
            break;
        case '?races':
            let symbolmos = args[0];
                if (!symbolmos) {
                    client.say(channel, `Races: ${mosctr.Current} / ${mosctr.Total}`);
                } else if (symbolmos == '+') {
            		if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                    	mosctr['Current'] += 1;
                    	client.say(channel, '[Increased] ' + `Races: ${mosctr.Current} / ${mosctr.Total}`);
                    	client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> Manually Increased MoS counter.');
                } else if (symbolmos == '-') {
		            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
        	            mosctr['Current'] += -1;
        	            client.say(channel, '[Decreased] ' + `Races: ${mosctr.Current} / ${mosctr.Total}`);
        	            client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> Manually Decreased MoS counter.');
                } else if (symbolmos == 'reset') {
		            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
        	            mosctr = {'Current': 0, 'Total': 0};
        	            client.say(channel, '[Reset] ' + `Races: ${mosctr.Current} / ${mosctr.Total}`);
        	            client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> Manually cleared MoS counter.');
                }
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + args[0]);
                fs.writeFile('./DataPull/Counters/zeroxfusionz/mosCurrent.txt', mosctr['Current'], function (err) {
				    if (err) return console.log(err);
				});
            break;
        case '?setmos':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                mosctr = {'Current': Number(args[0]) || 0, 'Total': Number(args[1]) || 0};
                client.say(channel, '[Set] ' + `Races: ${mosctr.Current} / ${mosctr.Total}`);
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> Manually set MoS counter.');
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + args.join(' '));
                fs.writeFile('./DataPull/Counters/zeroxfusionz/mosCurrent.txt', mosctr['Current'], function (err) {
				    if (err) return console.log(err);
				});
                fs.writeFile('./DataPull/Counters/zeroxfusionz/mosTotal.txt', mosctr['Total'], function (err) {
				    if (err) return console.log(err);
				});
            break;
        case '!play':
        	if (userstate.username != 'itsjusttriz') return;
        	else
	        	if (isOnCooldown(channel, command)) return;
	        	else {
	        		setCooldown(channel, command, 5);
	        		client.say(channel, '!play')
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
    client.say(channel, '!hearts');
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
    client.say(channel, '!hearts');
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
    client.say(channel, '!hearts');
    client.say('#nottriz', '[' + channel + '] GIFTSUB: ' + gifter + ' -> ' + recipient + ' (' + method.plan + ')');
}


function handleCheer(channel, userstate, message) {
    var username = userstate.username;
    var bits = userstate.bits;
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