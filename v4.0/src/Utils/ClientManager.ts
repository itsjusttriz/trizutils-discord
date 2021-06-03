import * as TMI from 'tmi.js';
import { ApiClient } from 'twitch';

import * as Discord from 'discord.js';
// TODO: Import ApiClient.

import ClientUtils from './ClientUtils.js';

const TwitchClient = {
    TMI: new TMI.Client(ClientUtils.Twitch.ClientOptions),
    // TODO: Setup ApiClient.
    API: {}
};

// TODO: Setup Discord Client.
const DiscordClient = new Discord.Client();

export default {
    TwitchClient,
    DiscordClient
};