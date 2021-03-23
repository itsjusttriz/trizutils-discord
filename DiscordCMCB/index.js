import * as Discord from 'discord.js';
import chalk from 'chalk';
import * as fs from 'fs';
import { default as config } from './config.js';

const client = new Discord.Client();

client.login(config.token)

client.config = config;
client.commands = new Discord.Collection();
client.guildIdList = new Map([
	['nightshade_alley', '466402083466379267'],
	['cmcb_official', '768289504603275265'],
	['toxicbunch', '155849052850880513'],
	['finnarmy', '585627689612869645'],
	['unicorn-shed', '314737648839294986'],
	['blitzyuk', '758341730575319120']
]);
client.colorWheel = new Map([
	['RED', '#ff000d'],
	['GREEN', '#42f572'],
	['ORANGE', '#ff6a00'],
	['YELLOW', '#ffee00']
]);
client.systemEmojis = new Map([
	['TWITCH_LOGO', '<:TwitchSymbol:809538716933816321>'],
	['TWITTER_LOGO', '<:TwitterSymbol:809538659333701642>'],
	['BACKEND_WARNING', '<:backEndWarning:809617045213151283>'],
	['BACKEND_TICK', '<:backEndTick:809620114449891358>'],
	['BACKEND_CROSS', '<:backEndCross:809620114084593675>'],
	['BACKEND_QUESTION', '<:backEndQuestion:809620114357878795>'],
	['BACKEND_PLUS', '<:backEndPlus:809616743659995146>'],
	['BACKEND_MINUS', '<:backEndMinus:809616743332708372>'],
	['BCKEND_MENU', '<:backEndMenu:809620114387107870>'],
	['BACKEND_INFO', '<:backEndInfo:809620114123128833>'],
	['BACKEND_EXCLAMATION', '<:backEndExclamation:809620115183501362>'],
	['BACKEND_LEAVE', '<:leaveServer:770829554059182090>'],
	['BACKEND_JOIN', '<:joinServer:770829534793826314>']
]);
client.activityArray = ['Hello!', 'My name is Nottriz', 'I am in development', `Type ${client.config.prefix}help for help.`];
client.presenceArray = ['online', 'idle', 'dnd'];

fs.readdir('./commands/', (err, files) => {
	if (err) return console.error(err);
	console.log(chalk.yellow.bold(`Loading Commands...`))
	files.forEach(async file => {
		if (!file.endsWith('.js')) return;
		const cmdFile = import(`./commands/${file}`);
		let cmdName = file.split('.')[0];
		console.log(`[CMD_LOADER] ${cmdName} ✅`);
		client.commands.set(cmdName, await cmdFile)
	})
})

fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	console.log(chalk.yellow.bold(`Loading Events...`))
	files.forEach(async file => {
		const event = await import(`./events/${file}`);
		let eventName = file.split('.')[0];
		console.log(`[EVENT_LOADER] ${eventName} ✅`)
		client.on(eventName, event[Object.keys(event)[0]].bind(null, client));
	})
})