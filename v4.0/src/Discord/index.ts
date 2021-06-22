import ClientManager from "../Utils/ClientManager.js";
import ClientUtils from "../Utils/ClientUtils.js";
import chalk from 'chalk';
import debug from "./Events/debug.js";
import message from "./Events/message.js";

async function init() {
    const DiscordClient = ClientManager.DiscordClient;

    DiscordClient.SYS.login(ClientUtils.Discord.self.getToken(process.env)).then(data => {

        console.log(chalk.hex(ClientUtils.Discord.tagColor).bold(`Connected to Discord via: ${chalk.yellow(data === process.env.DISCORD_TOKEN ? 'Actual Token' : 'Testing Token')}`));

    }).catch(err => {

        console.error(err);

    });

    // TODO: Command Handler.

    // TODO: Event Handler.
    DiscordClient.SYS.on('debug', debug);
    DiscordClient.SYS.on('message', message);
};

export default { init };