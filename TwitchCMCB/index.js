import { RefreshableAuthProvider, StaticAuthProvider } from 'twitch-auth';
import { ChatClient } from 'twitch-chat-client';
import { ApiClient } from 'twitch';
import { PubSubClient } from 'twitch-pubsub-client';
import { promises as fsp } from 'fs';
import { config } from './config.js';
import * as fs from 'fs';
import chalk from 'chalk';

async function main() {
    const tokenData = JSON.parse(await fsp.readFile('./tokens.json'));
    const auth = new RefreshableAuthProvider(
        new StaticAuthProvider(config.clientId, tokenData.accessToken),
        {
            clientSecret: config.clientSecret,
            refreshToken: tokenData.refreshToken,
            expiry: tokenData.expiryTimestamp === null ? null : new Date(tokenData.expiryTimestamp),
            onRefresh: async ({ accessToken, refreshToken, scope, expiryDate }) => {
                const newTokenData = {
                    accessToken,
                    refreshToken,
                    scope,
                    expiryTimestamp: expiryDate === null ? null : expiryDate.getTime()
                };
                await fsp.writeFile('./tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8')
                await fsp.writeFile('../DiscordCMCB/twitch-tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8')
            }
        }
    );
    // pubSubClient.start()
    const pubSubClient = new PubSubClient();

    // apiClient.start()
    const apiClient = new ApiClient({ authProvider: auth });

    // chatClient.start()
    const chatClient = new ChatClient(auth, { channels: [] });
    // const chatClient = new ChatClient(auth, { channels: ['nottriz'], logger: { minLevel: 'DEBUG' } });

    if (!(chatClient.isConnected && chatClient.isConnecting)) {
        await chatClient.connect()
    }

    chatClient.commands = new Map();
    chatClient.redirects = new Map([
        ['subApiAuth', 'Expired Link!']
    ]);
    chatClient.cmdEditGroups = {
        // Channels that use '!command edit'.
        groupOne: ['#domosplace', '#immp', '#reninsane', '#theimperialbitgod', '#xobias', '#chachava', '#kikiisyourfriend', '#ja_keeler', '#yzulf'],
        // Channels that use '!editcom'.
        groupTwo: ['#jayrockbird', '#queenliz09', '#superfraggle', '#zeroxfusionz', '#vertigo67', '#finncapp', '#masonnnn7'],
        // Channels that use '!editcommand'
        groupThree: ['#blitzyuk'],
        // Channels that use '!cmdrs'.
        groupFour: ['#itsjusttriz']
    }

    fs.readdir('./commands/', (err, files) => {
        if (err) return console.error(err);
        console.log(chalk.yellow.bold(`Loading Commands...`));
        files.forEach(async file => {
            if (!file.endsWith('.js')) return;
            const cmdFile = await import(`./commands/${file}`);
            let cmdName = file.split('.')[0];
            console.log(`[CMD_LOADER] ${cmdName} ✅`);
            chatClient.commands.set(cmdName, cmdFile);
            if (cmdFile.default.aliases) {
                if (cmdFile.default.aliases.length > 0) {
                    cmdFile.default.aliases.forEach(a => {
                        chatClient.commands.set(a, cmdFile);
                    });
                }
            }
        })
    });

    fs.readdir('./events/', (err, files) => {
        if (err) return console.error(err);
        console.log(chalk.yellow.bold(`Loading Events...`));
        files.forEach(async file => {
            const event = await import(`./events/${file}`);
            let eventName = file.split('.')[0];
            console.log(`[EVENT_LOADER] ${eventName} ✅`);
            switch (eventName) {
                case 'onRegister':
                    chatClient.onRegister(() => event.default(chatClient, apiClient));
                    break;
                case 'onJoin':
                    chatClient.onJoin((channel, user) => event.default(chatClient, channel, user))
                    break;
                case 'onPart':
                    chatClient.onPart((channel, user) => event.default(chatClient, channel, user))
                    break;
                case 'onMessage':
                    chatClient.onMessage((channel, user, message, msg) => event.default(chatClient, apiClient, channel, user, message, msg));
                    break;
                case 'onCheer':
                    chatClient.onMessage((channel, user, message, msg) => event.default(chatClient, channel, user, message, msg));
                    break;
                case 'onSub':
                    chatClient.onSub(event[Object.keys(event)[0]].bind(null, chatClient));
                    break;
                case 'onResub':
                    chatClient.onResub(event[Object.keys(event)[0]].bind(null, chatClient));
                    break;
                case 'onSubGift':
                    chatClient.onSubGift(event[Object.keys(event)[0]].bind(null, chatClient));
                    break;
                case 'onRaid':
                    chatClient.onRaid(event[Object.keys(event)[0]].bind(null, chatClient));
                    break;

            }
        })
    })
}

main();