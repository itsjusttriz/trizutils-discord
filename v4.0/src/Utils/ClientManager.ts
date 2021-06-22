import * as TMIJS from 'tmi.js';
// import { ApiClient } from 'twitch';

import * as Discord from 'discord.js';

import ClientUtils from './ClientUtils.js';

const TwitchClient = {
    TMI: (env: NodeJS.ProcessEnv) => new TMIJS.Client(ClientUtils.Twitch.clientOpts(env)),
    // TODO: Setup ApiClient.
    API: {},
    CommandMap: new Map()
};

// TODO: Setup Discord Client.
const DiscordClient = {
    SYS: new Discord.Client(),
    CommandMap: new Map()
}

export default {
    TwitchClient,
    DiscordClient
};