import chalk from 'chalk';
import { config } from '../config.js';
import { BlacklistedTerms, ExtraCommands } from '../utils/Functions.js';
import { HandlerManager } from '../utils/HandlerManager.js';

export default async function onMessage(chatClient, apiClient, channel, user, message, msg) {
    console.log(`${chalk.blue(`[${channel}]`)} ${chalk.magenta(`<${user}>`)} ${chalk.grey('|')} ${chalk.white.bold(`${message}`)}`);

    const args = message.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Shrink variables for easier export
    const options = {
        chatClient: chatClient,
        apiClient: apiClient,
        channel: channel,
        user: user,
        message: message,
        msg: msg,
        args: args,
        command: command,
        isSubPlus: msg.userInfo.isSubscriber || msg.userInfo.isFounder,
        isModPlus: msg.userInfo.isMod || msg.userInfo.isBroadcaster,
        isCaster: msg.userInfo.isBroadcaster,
        isBotAdmin: Boolean(config.botAdmin.indexOf(user)),
        disabledCommand: `@${user}, This command has been temporarily disabled.`,
        noSubApiAuth: `Missing Authentication!! Please Authenticate here and try again - ${chatClient.redirects.get('subApiAuth')}`,
        logChan: 'nottriz',
        logMsg: `[${channel}] <${user}> ${message}`
    };

    BlacklistedTerms(options);
    ExtraCommands(options);

    // Ignore messages not starting with the prefix (in config.json)
    if (!message.startsWith(config.prefix)) return;

    // Define 'cmd' and 'exCmd'
    const cmd = await chatClient.commands.get(command);

    // If command is known, run command. Otherwise, ignore.
    if (!cmd) return;

    if (HandlerManager.cache['message']?.[options.channel]) {
        cmd.default.run(chatClient, message, args, options);
    }
}