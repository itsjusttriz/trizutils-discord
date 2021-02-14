import * as Discord from 'discord.js';
import chalk from 'chalk';
import * as TimeFormat from 'hh-mm-ss';
import * as fs from 'fs';
import { default as config } from './config.js';
import * as defaults from './datapull/defaults.js';

const client = new Discord.Client();

client.login(config.token)

client.config = config;
client.commands = new Discord.Collection();
client.twitchTokens = {};
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
client.activityArray = ['Hello!', 'My name is Nottriz', 'I am in development', 'Type n!support for help'];
client.presenceArray = ['online', 'idle', 'dnd'];

fs.readdir('./commands/', (err, files) => {
	if (err) return console.error(err);
	console.log(chalk.yellow.bold(`Loading Commands...`))
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const cmdFile = import(`./commands/${file}`);
		let cmdName = file.split('.')[0];
		console.log(`[CMD_LOADER] ${cmdName} ✅`);
		client.commands.set(cmdName, cmdFile)
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