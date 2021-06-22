import chalk from 'chalk';
import ClientManager from "../Utils/ClientManager.js";
import ClientUtils from "../Utils/ClientUtils.js";

// Import Event Handlers.
import chat from "./Events/chat.js";
import cheer from './Events/cheer.js';
import join from "./Events/join.js";
import part from './Events/part.js';

async function init(env: NodeJS.ProcessEnv): Promise<any> {

    const TMIClient = ClientManager.TwitchClient.TMI(env);
    const APIClient = ClientManager.TwitchClient.API;

    // await TMIClient.connect();
    TMIClient.connect()
        .then(data => {
            const [ip, port] = data;

            console.log(chalk.hex(ClientUtils.Twitch.tagColor).bold(`Connected to Twitch via: ${chalk.yellow(ip)} | ${chalk.yellow(port)}`));

        }).catch(err => {

            console.error(err);

        });

    // TODO: Command Handler

    // TODO: Event Handler
    TMIClient.on('chat', (channel, userstate, message, self) => chat(TMIClient, channel, userstate, message, self));
    TMIClient.on('join', (channel, username, self) => join(TMIClient, channel, username, self));
    TMIClient.on('part', (channel, username, self) => part(TMIClient, channel, username, self));
    TMIClient.on('cheer', (channel, userstate, message) => cheer(TMIClient, channel, userstate, message));

}

export default { init }