const request = require('request');
const getUrls = require('get-urls');
const client = require('../config.js').client;
const fs = require('fs');
const botAdmin = require('../main.js').botAdmin;

let cooldown = {};
let exercise = {'JJs': 0, 'Squats': 0, 'Hoops': 0};

fs.readFile('./DataPull/Counters/domosplace/fitJJs.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    exercise['JJs'] = parseInt(data);
});

fs.readFile('./DataPull/Counters/domosplace/fitSquats.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    exercise['Squats'] = parseInt(data);
});

fs.readFile('./DataPull/Counters/domosplace/fitHoops.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    exercise['Hoops'] = parseInt(data);
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
        case '?twitchded':
            if (self) return;
        		client.say(channel, 'Yes, Twitch is dead. APIs are erroring, Sites are dying, and people are being cancelled Kappa Oh Well #BlameTwitch');
        	break;
		case '?dance':
			if (self) return;
			if (userstate.username !== 'itsjusttriz' && userstate.username !== 'nottriz') return;
				client.say(channel, 'DANCE DANCE DANCE DANCE DANCE DANCE DANCE DANCE');
				client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
			break;
		case '?sethome':
			if (self) return;
			if (!userstate.mod && userstate['room-id'] !== userstate['user-id']) return
			if (!args[0]) {
				client.say(channel, "Usage: ?sethome x y z.");
			} else {
				client.say(channel, "!command edit !home Domo's home is at XYZ: " + args.join(' '));
			}
			client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
			break;
		case '?addfit':
			if (userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
			let addactivity = args[0];
				if (!addactivity) {
					client.say(channel, 'Usage: ?addfit (jjs/squats/hoops)');
				} else if (addactivity == 'jjs') {
					exercise['JJs'] += 5;
					client.say(channel, '[JJs Increased] ' + `JJs: ${exercise.JJs}, Squats: ${exercise.Squats}, Hoops: ${exercise.Hoops} seconds`);
				} else if (addactivity == 'squats') {
					exercise['Squats'] += 5;
					client.say(channel, '[Squats Increased] ' + `JJs: ${exercise.JJs}, Squats: ${exercise.Squats}, Hoops: ${exercise.Hoops} seconds`);
				} else if (addactivity == 'hoops') {
					exercise['Hoops'] += 10;
					client.say(channel, '[Hoops Increased] ' + `JJs: ${exercise.JJs}, Squats: ${exercise.Squats}, Hoops: ${exercise.Hoops} seconds`);
				}
				client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + addactivity);
                fs.writeFile('../DataPull/Counters/domosplace/fitJJs.txt', exercise['JJs'], function (err) {
                    if (err) return console.log(err);
                });
                fs.writeFile('../DataPull/Counters/domosplace/fitSquats.txt', exercise['Squats'], function (err) {
                    if (err) return console.log(err);
                });
                fs.writeFile('../DataPull/Counters/domosplace/fitHoops.txt', exercise['Hoops'], function (err) {
                    if (err) return console.log(err);
                });
			break;
		case '?delfit':
			if (userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
			let delactivity = args[0];
				if (!delactivity) {
					client.say(channel, 'Usage: ?delfit (jjs/squats/hoops)');
				} else if (delactivity == 'jjs') {
					exercise['JJs'] += -5;
					client.say(channel, '[JJs Decreased] ' + `JJs: ${exercise.JJs}, Squats: ${exercise.Squats}, Hoops: ${exercise.Hoops} seconds`);
				} else if (delactivity == 'squats') {
					exercise['Squats'] += -5;
					client.say(channel, '[Squats Decreased] ' + `JJs: ${exercise.JJs}, Squats: ${exercise.Squats}, Hoops: ${exercise.Hoops} seconds`);
				} else if (delactivity == 'hoops') {
					exercise['Hoops'] += -10;
					client.say(channel, '[Hoops Decreased] ' + `JJs: ${exercise.JJs}, Squats: ${exercise.Squats}, Hoops: ${exercise.Hoops} seconds`);
				}
				client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + delactivity);
                fs.writeFile('../DataPull/Counters/domosplace/fitJJs.txt', exercise['JJs'], function (err) {
                    if (err) return console.log(err);
                });
                fs.writeFile('../DataPull/Counters/domosplace/fitSquats.txt', exercise['Squats'], function (err) {
                    if (err) return console.log(err);
                });
                fs.writeFile('../DataPull/Counters/domosplace/fitHoops.txt', exercise['Hoops'], function (err) {
                    if (err) return console.log(err);
                });
			break;
		case '?resetfit':
			if (self) return;
			if (userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
				exercise = {'JJs': 0, 'Squats': 0, 'Hoops': 0};
					client.say(channel, '[Cleared Exercise] ' + `JJs: ${exercise.JJs}, Squats: ${exercise.Squats}, Hoops: ${exercise.Hoops} seconds`);
				client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
                fs.writeFile('../DataPull/Counters/domosplace/fitJJs.txt', exercise['JJs'], function (err) {
                    if (err) return console.log(err);
                });
                fs.writeFile('../DataPull/Counters/domosplace/fitSquats.txt', exercise['Squats'], function (err) {
                    if (err) return console.log(err);
                });
                fs.writeFile('../DataPull/Counters/domosplace/fitHoops.txt', exercise['Hoops'], function (err) {
                    if (err) return console.log(err);
                });
			break;
		case '?fit':
			if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
				client.say(channel, '[Total Exercises] ' + `JJs: ${exercise.JJs}, Squats: ${exercise.Squats}, Hoops: ${exercise.Hoops} seconds`);
				client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
			break;
        case '?setfit':
            if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
                exercise = {'JJs': Number(args[0]) || 0, 'Squats': Number(args[1]) || 0, 'Hoops': Number(args[2]) || 0};
                client.say(channel, '[Updated Exercises] ' + `JJs: ${exercise.JJs}, Squats: ${exercise.Squats}, Hoops: ${exercise.Hoops} seconds`);
				client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + args.shift(' '));
                fs.writeFile('../DataPull/Counters/domosplace/fitJJs.txt', exercise['JJs'], function (err) {
                    if (err) return console.log(err);
                });
                fs.writeFile('../DataPull/Counters/domosplace/fitSquats.txt', exercise['Squats'], function (err) {
                    if (err) return console.log(err);
                });
                fs.writeFile('../DataPull/Counters/domosplace/fitHoops.txt', exercise['Hoops'], function (err) {
                    if (err) return console.log(err);
                });
            break;
	}
}

function handleSub(channel, username, method, message, userstate) {
	if (method.plan == '1000') {
		client.say(channel, username + ' just subscribed to Domosplace!');
		client.say(channel, '!subadd1 ' + username);
	} else if (method.plan == '2000') {
		client.say(channel, username + ' just subscribed to Domosplace!');
		client.say(channel, '!subadd2 ' + username);
	} else if (method.plan == '3000') {
		client.say(channel, username + ' just subscribed to Domosplace!');
		client.say(channel, '!subadd3 ' + username);
	} else if (method.prime) {
		client.say(channel, username + ' just subscribed to Domosplace with Twitch Prime!');
		client.say(channel, '!subadd1 ' + username);
	}
    client.say('#nottriz', '[' + channel + '] SUB: ' + username + ' (' + method.plan + ')');
}

function handleResub(channel, username, useless, message, userstate, method) {
	if (method.plan == '1000') {
		client.say(channel, 'PogChamp Returning Tier 1 Sub: ' + username + ' (' + userstate['msg-param-cumulative-months'] + ' months) PogChamp');
		client.say(channel, '!subadd1 ' + username);
	} else if (method.plan == '2000') {
		client.say(channel, 'PogChamp Returning Tier 2 Sub: ' + username + ' (' + userstate['msg-param-cumulative-months'] + ' months) PogChamp');
		client.say(channel, '!subadd2 ' + username);
	} else if (method.plan == '3000') {
		client.say(channel, 'PogChamp Returning Tier 3 Sub: ' + username + ' (' + userstate['msg-param-cumulative-months'] + ' months) PogChamp');
		client.say(channel, '!subadd3 ' + username);
	} else if (method.prime) {
		client.say(channel, 'PogChamp Returning Prime Sub: ' + username + ' (' + userstate['msg-param-cumulative-months'] + ' months) PogChamp');
		client.say(channel, '!subadd1 ' + username);
	}
    client.say('#nottriz', '[' + channel + '] RESUB: ' + username + ' - ' + userstate['msg-param-cumulative-months'] + 'months (' + method.plan + ')');
}

function handleGiftsub(channel, gifter, recipient, method, userstate) {
	if (method.plan == '1000') {
	client.say(channel, gifter + ' gifted a sub to ' + recipient + '!');
	client.say(channel, '!giftadd1 ' + gifter + ' ' + recipient);
	} else if (method.plan == '2000') {
	client.say(channel, gifter + ' gifted a sub to ' + recipient + '!');
	client.say(channel, '!giftadd2 ' + gifter + ' ' +  recipient);
	} else if (method.plan == '3000') {
	client.say(channel, gifter + ' gifted a sub to ' + recipient + '!');
	client.say(channel, '!giftadd3 ' + gifter + ' ' + recipient);
	}
    client.say('#nottriz', '[' + channel + '] GIFTSUB: ' + gifter + ' -> ' + recipient + ' (' + method.plan + ')');
}

function handleCheer(channel, userstate, message) {
	var username = userstate.username;
	var	bits = userstate.bits;

	client.say(channel, 'PogChamp x' + bits);
    client.say('#nottriz', '[' + channel + '] BITS: ' + username + ' (' + bits + ')');
}

function handleRaid(customraid) {
	client.say(customraid.channel, "Welcome Raiders from " + customraid.raider + "'s channel! <3 GivePLZ");
	client.say(customraid.channel, '!raided ' + customraid.raider);
	client.say(customraid.channel, '!so ' + customraid.raider);
	client.say('#nottriz', '[' + customraid.channel + '] RAID: ' + customraid.raider);
}

module.exports.handleChat = handleChat;
module.exports.handleSub = handleSub;
module.exports.handleResub = handleResub;
module.exports.handleGiftsub = handleGiftsub;
module.exports.handleCheer = handleCheer;
module.exports.handleRaid = handleRaid;