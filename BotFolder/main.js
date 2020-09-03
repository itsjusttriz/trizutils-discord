const twitchjs = require('twitch-js');
const request = require('request-promise');
const client = require('../config.js').client;

const botAdmin = ['47y_', 'itsjusttriz', 'nottriz', 'tellik', 'rhilou32', 'immp'];

//Channels that use '!command edit'.
const cmdGroup1 = ['#domosplace', '#immp', '#reninsane', '#theimperialbitgod', '#xobias', '#chachava', '#kikiisyourfriend', '#ja_keeler'];
//Channels that use '!editcom'.
const cmdGroup2 = ['#itsjusttriz', '#jayrockbird', '#queenliz09', '#superfraggle', '#zeroxfusionz', '#vertigo67', '#finncapp'];


module.exports.botAdmin = botAdmin;

const almostfae = require('./channels/almostfae.js');
const dfearthereaper = require('./channels/dfearthereaper.js');
const domosplace = require('./channels/domosplace.js');
const finncapp = require('./channels/finncapp.js');
const gwinthor = require('./channels/gwinthor.js');
const immp = require('./channels/immp.js');
const intimae = require('./channels/intimae.js');
const itsjusttriz = require('./channels/itsjusttriz.js');
const ja_keeler = require('./channels/ja_keeler.js');
const jayrockbird = require('./channels/jayrockbird.js');
const kikiisyourfriend = require('./channels/kikiisyourfriend.js');
const matrixis = require('./channels/matrixis.js');
const queenliz09 = require('./channels/queenliz09.js');
const reninsane = require('./channels/reninsane.js');
const rhilou32 = require('./channels/rhilou32.js');
const superfraggle = require('./channels/superfraggle.js');
const techyguy = require('./channels/techyguy.js');
const theimperialbitgod = require('./channels/theimperialbitgod.js');
const tonster46346 = require('./channels/tonster46346.js');
const xobias = require('./channels/xobias.js');
const zeroxfusionz = require('./channels/zeroxfusionz.js');

client.connect();
//client.on('action', (channel, userstate, message, self) => {}

client.on('join', function(channel, username, self) {
  if (self) client.say('#nottriz', '[Join] ' + channel);
});

Array.prototype.random = function() {
    return this[Math.floor((Math.random()*this.length))]
};

const nonTurboColors = [ 'blue', 'blueviolet', 'cadetblue', 'chocolate', 'coral', 'dodgerblue', 'firebrick', 'goldenrod', 'green', 'hotpink', 'orangered', 'red', 'seagreen', 'springgreen', 'yellowgreen' ];

setInterval(function() {
    client.color(nonTurboColors.random());
}, 1000 * 2);

client.on('chat', (channel, userstate, message, self) => {
	let command = message.split(' ')[0];
	let args = message.split(' ');
	args.shift();

	if (channel == '#almostfae') {
    	almostfae.handleChat(channel, userstate, message, self);
    } else if (channel == '#dfearthereaper') {
    	dfearthereaper.handleChat(channel, userstate, message, self);
    } else if (channel == '#domosplace') {
    	domosplace.handleChat(channel, userstate, message, self);
    } else if (channel == '#finncapp') {
    	finncapp.handleChat(channel, userstate, message, self);
    } else if (channel == '#gwinthor') {
    	gwinthor.handleChat(channel, userstate, message, self);
    } else if (channel == '#immp') {
    	immp.handleChat(channel, userstate, message, self);
    } else if (channel == '#intimae') {
    	intimae.handleChat(channel, userstate, message, self);
    } else if (channel == '#itsjusttriz') {
    	itsjusttriz.handleChat(channel, userstate, message, self);
    } else if (channel == '#ja_keeler') {
    	ja_keeler.handleChat(channel, userstate, message, self);
    } else if (channel == '#jayrockbird') {
    	jayrockbird.handleChat(channel, userstate, message, self);
    } else if (channel == '#kikiisyourfriend') {
    	kikiisyourfriend.handleChat(channel, userstate, message, self);
    } else if (channel == '#matrixis') {
    	matrixis.handleChat(channel, userstate, message, self);
    } else if (channel == '#queenliz09') {
    	queenliz09.handleChat(channel, userstate, message, self);
    } else if (channel == '#reninsane') {
    	reninsane.handleChat(channel, userstate, message, self);
    } else if (channel == '#rhilou32') {
    	rhilou32.handleChat(channel, userstate, message, self);
    } else if (channel == '#superfraggle') {
    	superfraggle.handleChat(channel, userstate, message, self);
    } else if (channel == '#techyguy') {
    	techyguy.handleChat(channel, userstate, message, self);
    } else if (channel == '#theimperialbitgod') {
    	theimperialbitgod.handleChat(channel, userstate, message, self);
    } else if (channel == '#tonster46346') {
    	tonster46346.handleChat(channel, userstate, message, self);
    } else if (channel == '#xobias') {
    	xobias.handleChat(channel, userstate, message, self);
    } else if (channel == '#zeroxfusionz') {
    	zeroxfusionz.handleChat(channel, userstate, message, self);
    }

//Global Commands.
	switch(command) {
		case '?settimer':
			if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
				setTimeout(function CTimer() {
					client.say(channel, "Time's up!");
					client.say('#nottriz', '[' + channel + ']' + "Time's up!");
				}, 1000 * args[0]);
				client.say(channel, 'Timer set for ' + args[0] + ' seconds.');
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + args[0]);
			break;
		case '?triztime':
			if (self) return;
			if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
			request('https://decapi.me/misc/time?timezone=Europe/Dublin', (err, res, body) => {
				client.say(channel, "It's currently " + body + ' for Triz.');
			});
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
			break;
		case '?checkfollowcount':
			if (self) return;
			if (botAdmin.indexOf(userstate.username) < 0) return;
			request(`https://decapi.me/twitch/followcount/` + args[0], (err, res, body) => {
				client.say(channel, args[0] + ' has ' + body + ' followers!');
			});
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
			break;
		case '?checksubcount':
			if (self) return;
			if (botAdmin.indexOf(userstate.username) < 0) return;
			request(`https://decapi.me/twitch/subcount/` + args[0], (err, res, body) => {
    			client.say(channel, args[0] + ' has ' + body + ' Subscribers! (Including perm-subs)');
			});
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
			break;
		case '?checksubpoints':
			if (self) return;
			if (botAdmin.indexOf(userstate.username) < 0) return;
			request('https://decapi.me/twitch/subpoints/' + args[0], (err, res, body) => {
				client.say(channel, args[0] + ' has ' + body + ' SubPoints! (Including perm-subs)');
			});
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
			break;
		case '?checkswordcount':
            if (self) return;
			if (userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
            request({
                url: 'https://modlookup.3v.fi/api/user-totals/' + args[0],
                method: 'GET',
                headers: {
                    'Client-ID': '...'
                }}, (err, res, body) => {
                    if (JSON.parse(body).total > 0) {
                    	let swords = JSON.parse(body).total;
                        client.action(channel, args[0] + ' is modded in ' + swords.toString() + ' channels! List: https://twitchstuff.3v.fi/modlookup/u/' + args[0]);
                    } else
                        return;
                });
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
            break;
		case '?sudo':
			if (self) return;
			if (botAdmin.indexOf(userstate.username) < 0) return;
				client.say(channel, args.join(' '));
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
			break;
		case '?multiso':
			if (self) return;
			if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
				if (!args[0]) { 
					client.say(channel, "/w " + userstate.username + ' Usage: ?multiso <arg> <arg> <etc.>');
				} else {
					client.say(channel, "Check out the following nerds! You'll thank me later ;)");
				  	args.forEach(user => {
			    		client.say(channel, user + ' - https://twitch.tv/' + user);
					});
				}
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
			break;
        case '?setpack':
            if (self) return;
			if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
			const packlist = require('./DataPull/packlist.js');
            let mpack = args[0];
	            if (cmdGroup2.indexOf(channel) > -1) {
    	            if (!mpack) {
        	            client.say(channel, '/w ' + userstate.username + ' Usage: ?setpack ' + packlist.listpacks);
            	    } else if (mpack.toLowerCase()) {
            	        client.say(channel, '!editcom !pack ' + packlist[args[0]]);
            	    }
            	} else if (cmdGroup1.indexOf(channel) > -1) {
    	            if (!mpack) {
        	            client.say(channel, '/w ' + userstate.username + ' Usage: !setpack ' + packlist.listpacks);
            	    } else if (mpack.toLowerCase()) {
            	        client.say(channel, '!command edit !pack ' + packlist[args[0]]);
            	    }
            	}
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + mpack);
            break;
        case '?setrp':
            if (self) return;
			if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
			const rplist = require('./DataPull/rplist.js');
            let rpack = args[0];
	            if (cmdGroup2.indexOf(channel) > -1) {
    	            if (!rpack) {
        	            client.say(channel, '/w ' + userstate.username + ' Usage: ?setpack ' + rplist.listpacks);
            	    } else if (rpack.toLowerCase()) {
            	        client.say(channel, '!editcom !tp ' + rplist[args[0]]);
            	    }
            	} else if (cmdGroup1.indexOf(channel) > -1) {
    	            if (!rpack) {
        	            client.say(channel, '/w ' + userstate.username + ' Usage: !setpack ' + rplist.listpacks);
            	    } else if (rpack.toLowerCase()) {
            	        client.say(channel, '!command edit !tp ' + rplist[args[0]]);
            	    }
            	}
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + rpack);
            break;
        case '?emotes':
        	if (self) return;
			if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
			const emoteslist = require('./DataPull/emoteslist.js');
			let emotes = args[0];
				if (!emotes) {
					client.say(channel, '/w ' + userstate.username + ' Usage: ?emotes ' + emoteslist.listemotes);
				} else if (emotes.toLowerCase()) {
					client.say(channel, '' + (emoteslist[args[0]] || ''));
				} else
					return;
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
			break;
		case '?lockdown':
		case '?ld':
			if (self) return;
				if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
				let option = args[0];
				if (!option) {
					client.say(channel, 'Usage: !lockdown (on/off)');
				} else if (option.toLowerCase() == 'on') {
					client.say(channel, '/r9kbeta');
					client.say(channel, '/slow');
					client.say(channel, '/followers 1h');
					client.say(channel, 'SwiftRage Chat has been locked down!');
				} else if (option.toLowerCase() == 'off') {
					client.say(channel, '/r9kbetaoff');
					client.say(channel, '/slowoff');
					client.say(channel, '/followersoff');
					client.say(channel, 'SwiftRage Chat should now be safe! Enjoy your stay :D');
				}
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
				break;
		case '?math':
			if (self) return;
			if (!userstate.subscriber && !userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
				request(`http://twitch.center/customapi/math?expr=${encodeURI(args[0]).replace(/\+/g, '%2B')}`, (err, res, body) => {
    				if (err) {
        				console.log(err);
        				return; // You could post something in chat or just return, up to you.
    				}
    				if (body == '???') client.say('#nottriz', channel + ' >> ' + args.join(' ') + ' = Invalid expression');
    				// ^ Optional, but recommended
    				client.say(channel, args.join(' ') + ' = ' + body);
				});
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
				break;
		case '?trizspam':
			if (self) return;
			if (botAdmin.indexOf(userstate.username) < 0) return;
			if (channel == '#button') return;
				let num = args.shift();
				for (let i = 0; i < num; i++) {
					setTimeout(function letsbreakchat() {
    					client.say(channel, args.join(' '));
    				}, 100 * i );
				}
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
			break;
		case '?trizcord':
			if (self) return;
			if (userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
			if (!args[0]) return;
			else {
				client.say(channel, "/w " + args[0] + " Join Triz's Discord! There, you can discuss issues about the Nottriz chatbot OR request a massban! >> https://itsjusttriz.weebly.com/discord");
			}
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
			break;
		case '?n':
			if (self) return;
			let botoption = args[0];
				if (!botoption) {
					if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
					else
						client.say(channel, 'Usage: ?n (?/help/host/kill)');
				} else if (botoption.toLowerCase() == '?') {
					if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
					else
						client.action(channel, 'v4.7 is online! SeemsGood');
				} else if (botoption.toLowerCase() == 'help') {
					if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
					else
						client.say(channel, 'Visit https://itsjusttriz.weebly.com/chatbot-global for more support. SeemsGood');
				} else if (botoption.toLowerCase() == 'host') {
					if (botAdmin.indexOf(userstate.username) < 0) return;
						client.say('#itsjusttriz', "!editcom !hosting Triz is currently hosting " + channel.substr(1) + "! Please go check out their channel and join the conversation. It would mean a lot to both himself, and them >> https://twitch.tv/" + channel.substr(1));
						client.say('#itsjusttriz', '/host ' + channel.substr(1));
						client.say('#nottriz', '/host ' + channel.substr(1));
				} else if (botoption.toLowerCase() == 'kill') {
					if (botAdmin.indexOf(userstate.username) < 0) return;
					else
						process.exit(0);
				}
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command + ' ' + botoption);
			break;
		case '?breakspam':
			if (self) return;
			if (!userstate.mod && userstate['room-id'] !== userstate['user-id'] && botAdmin.indexOf(userstate.username) < 0) return;
				client.say(channel, 'B R E A K !');
				client.say(channel, 'B R E A K !');
				client.say(channel, 'B R E A K !');
				client.say(channel, 'B R E A K !');
				client.say(channel, 'B R E A K !');
                client.say('#nottriz', '[' + channel + '] <' + userstate.username + '> ' + command);
			break;
	}
});

/* For these, here are some useful variables to use:
	userstate['username']						The login name of the user.
	userstate['display-name']					The name shown in chat. This includes things like asian characters.
	userstate['msg-param-cumulative-months']	Total months subbed (only on resub).
	userstate['msg-param-streak-months']		Streak. If this is not shown in chat, it will show as 0 here too.
	userstate['msg-param-months']				Total months subbed (only on gift subs).
*/

client.on('subscription', (channel, username, method, message, userstate) => {
	switch(channel) {
		case '#almostfae':
			almostfae.handleSub(channel, username, method, message, userstate);
			break;
		case '#dfearthereaper':
			dfearthereaper.handleSub(channel, username, method, message, userstate);
			break;
		case '#domosplace':
			domosplace.handleSub(channel, username, method, message, userstate);
			break;
		case '#finncapp':
			finncapp.handleSub(channel, username, method, message, userstate);
			break;
		case '#gwinthor':
			gwinthor.handleSub(channel, username, method, message, userstate);
			break;
		case '#immp':
			immp.handleSub(channel, username, method, message, userstate);
			break;
		case '#intimae':
			intimae.handleSub(channel, username, method, message, userstate);
			break;
		case '#itsjusttriz':
			itsjusttriz.handleSub(channel, username, method, message, userstate);
			break;
		case '#ja_keeler':
			ja_keeler.handleSub(channel, username, method, message, userstate);
			break;
		case '#jayrockbird':
			jayrockbird.handleSub(channel, username, method, message, userstate);
			break;
		case '#kikiisyourfriend':
			kikiisyourfriend.handleSub(channel, username, method, message, userstate);
			break;
		case '#matrixis':
			matrixis.handleSub(channel, username, method, message, userstate);
			break;
		case '#queenliz09':
			queenliz09.handleSub(channel, username, method, message, userstate);
			break;
		case '#reninsane':
			reninsane.handleSub(channel, username, method, message, userstate);
			break;
		case '#rhilou32':
			rhilou32.handleSub(channel, username, method, message, userstate);
			break;
		case '#superfraggle':
			superfraggle.handleSub(channel, username, method, message, userstate);
			break;
		case '#techyguy':
			techyguy.handleSub(channel, username, method, message, userstate);
			break;
		case '#theimperialbitgod':
			theimperialbitgod.handleSub(channel, username, method, message, userstate);
			break;
		case '#tonster46346':
			tonster46346.handleSub(channel, username, method, message, userstate);
			break;
		case '#xobias':
			xobias.handleSub(channel, username, method, message, userstate);
			break;
		case '#zeroxfusionz':
			zeroxfusionz.handleSub(channel, username, method, message, userstate);
			break;
	}
});

client.on('resub', (channel, username, useless, message, userstate, method) => {
	switch(channel) {
		case '#almostfae':
			almostfae.handleResub(channel, username, useless, message, userstate, method);
			break;
		case '#dfearthereaper':
			dfearthereaper.handleResub(channel, username, useless, message, userstate, method);
			break;
		case '#domosplace':
			domosplace.handleResub(channel, username, useless, message, userstate, method);
			break;
		case '#finncapp':
			finncapp.handleResub(channel, username, useless, message, userstate, method);
			break;
		case '#gwinthor':
			gwinthor.handleResub(channel, username, useless, message, userstate, method);
			break;
		case '#immp':
			immp.handleResub(channel, username, useless, message, userstate, method);
			break;
		case '#intimae':
			intimae.handleResub(channel, username, useless, message, userstate, method);
			break;
		case '#itsjusttriz':
			itsjusttriz.handleResub(channel, username, useless, message, userstate, method);
			break;
		case '#ja_keeler':
			ja_keeler.handleResub(channel, username, useless, message, userstate, method);
			break;
		case '#jayrockbird':
			jayrockbird.handleResub(channel, username, useless, message, userstate, method);
			break;
		case '#kikiisyourfriend':
			kikiisyourfriend.handleResub(channel, username, useless, message, userstate, method);
			break;
		case '#matrixis':
			matrixis.handleResub(channel, username, useless, message, userstate, method);
			break;
		case '#queenliz09':
			queenliz09.handleResub(channel, username, useless, message, userstate, method);
			break;
		case '#reninsane':
			reninsane.handleResub(channel, username, useless, message, userstate, method);
			break;
		case '#rhilou32':
			rhilou32.handleResub(channel, username, useless, message, userstate, method);
			break;
		case '#superfraggle':
			superfraggle.handleResub(channel, username, useless, message, userstate, method);
			break;
		case '#techyguy':
			techyguy.handleResub(channel, username, useless, message, userstate, method);
			break;
		case '#theimperialbitgod':
			theimperialbitgod.handleResub(channel, username, useless, message, userstate, method);
			break;
		case '#tonster46346':
			tonster46346.handleResub(channel, username, useless, message, userstate, method);
			break;
		case '#xobias':
			xobias.handleResub(channel, username, useless, message, userstate, method);
			break;
		case '#zeroxfusionz':
			zeroxfusionz.handleResub(channel, username, useless, message, userstate, method);
			break;
	}
});

client.on('subgift', (channel, gifter, recipient, method, userstate) => {
	switch(channel) {
		case '#almostfae':
			almostfae.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
		case '#dfearthereaper':
			dfearthereaper.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
		case '#domosplace':
			domosplace.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
		case '#finncapp':
			finncapp.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
		case '#gwinthor':
			gwinthor.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
		case '#immp':
			immp.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
		case '#intimae':
			intimae.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
		case '#itsjusttriz':
			itsjusttriz.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
		case '#ja_keeler':
			ja_keeler.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
		case '#jayrockbird':
			jayrockbird.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
		case '#kikiisyourfriend':
			kikiisyourfriend.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
		case '#matrixis':
			matrixis.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
		case '#queenliz09':
			queenliz09.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
		case '#reninsane':
			reninsane.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
		case '#rhilou32':
			rhilou32.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
		case '#superfraggle':
			superfraggle.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
		case '#techyguy':
			techyguy.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
		case '#theimperialbitgod':
			theimperialbitgod.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
		case '#tonster46346':
			tonster46346.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
		case '#xobias':
			xobias.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
		case '#zeroxfusionz':
			zeroxfusionz.handleGiftsub(channel, gifter, recipient, method, userstate);
			break;
	}
});

/*client.on('subcommunitygift', (count, gifter, gifterGiftCount, plan) => {
	switch(channel) {
		case '#domosplace':
			client.say(channel, gifter + ' has gifted ' + count + ' subs to the channel. (Total: ' + gifterGiftCount + ')');
			client.say('#nottriz', gifter + ' has gifted ' + count + ' subs to the channel. (Total: ' + gifterGiftCount + ')');
			break;
	}
});*/


client.on('cheer', (channel, userstate, message) => {
	var username = userstate.username;
	var	bits = userstate.bits;

	switch(channel) {
		case '#almostfae':
			almostfae.handleCheer(channel, userstate, message);
			break;
		case '#dfearthereaper':
			dfearthereaper.handleCheer(channel, userstate, message);
			break;
		case '#domosplace':
			domosplace.handleCheer(channel, userstate, message);
			break;
		case '#finncapp':
			finncapp.handleCheer(channel, userstate, message);
			break;
		case '#gwinthor':
			gwinthor.handleCheer(channel, userstate, message);
			break;
		case '#immp':
			immp.handleCheer(channel, userstate, message);
			break;
		case '#intimae':
			intimae.handleCheer(channel, userstate, message);
			break;
		case '#itsjusttriz':
			itsjusttriz.handleCheer(channel, userstate, message);
			break;
		case '#ja_keeler':
			ja_keeler.handleCheer(channel, userstate, message);
			break;
		case '#jayrockbird':
			jayrockbird.handleCheer(channel, userstate, message);
			break;
		case '#kikiisyourfriend':
			kikiisyourfriend.handleCheer(channel, userstate, message);
			break;
		case '#matrixis':
			matrixis.handleCheer(channel, userstate, message);
			break;
		case '#queenliz09':
			queenliz09.handleCheer(channel, userstate, message);
			break;
		case '#reninsane':
			reninsane.handleCheer(channel, userstate, message);
			break;
		case '#rhilou32':
			rhilou32.handleCheer(channel, userstate, message);
			break;
		case '#superfraggle':
			superfraggle.handleCheer(channel, userstate, message);
			break;
		case '#techyguy':
			techyguy.handleCheer(channel, userstate, message);
			break;
		case '#theimperialbitgod':
			theimperialbitgod.handleCheer(channel, userstate, message);
			break;
		case '#tonster46346':
			tonster46346.handleCheer(channel, userstate, message);
			break;
		case '#xobias':
			xobias.handleCheer(channel, userstate, message);
			break;
		case '#zeroxfusionz':
			zeroxfusionz.handleCheer(channel, userstate, message);
			break;
	}
});


client.on('raid', (customraid) => {
	switch(customraid.channel) {
		case '#almostfae':
			almostfae.handleRaid(customraid);
			break;
		case '#dfearthereaper':
			dfearthereaper.handleRaid(customraid);
			break;
		case '#domosplace':
			domosplace.handleRaid(customraid);
			break;
		case '#finncapp':
			finncapp.handleRaid(customraid);
			break;
		case '#gwinthor':
			gwinthor.handleRaid(customraid);
			break;
		case '#immp':
			immp.handleRaid(customraid);
			break;
		case '#intimae':
			intimae.handleRaid(customraid);
			break;
		case '#itsjusttriz':
			itsjusttriz.handleRaid(customraid);
			break;
		case '#ja_keeler':
			ja_keeler.handleRaid(customraid);
			break;
		case '#jayrockbird':
			jayrockbird.handleRaid(customraid);
			break;
		case '#kikiisyourfriend':
			kikiisyourfriend.handleRaid(customraid);
			break;
		case '#matrixis':
			matrixis.handleRaid(customraid);
			break;
		case '#queenliz09':
			queenliz09.handleRaid(customraid);
			break;
		case '#reninsane':
			reninsane.handleRaid(customraid);
			break;
		case '#rhilou32':
			rhilou32.handleRaid(customraid);
			break;
		case '#superfraggle':
			superfraggle.handleRaid(customraid);
			break;
		case '#techyguy':
			techyguy.handleRaid(customraid);
			break;
		case '#theimperialbitgod':
			theimperialbitgod.handleRaid(customraid);
			break;
		case '#tonster46346':
			tonster46346.handleRaid(customraid);
			break;
		case '#xobias':
			xobias.handleRaid(customraid);
			break;
		case '#zeroxfusionz':
			zeroxfusionz.handleRaid(customraid);
			break;
	}
});

require('./externalcommands/massbansystem/massban.js');
//require('./externalcommands/massunban.js');
require('./externalcommands/hearts.js');
