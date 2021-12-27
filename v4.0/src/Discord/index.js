import { config as EnvConfig } from 'dotenv';

EnvConfig({ path: '../../.env' });
const { DISCORD_TOKEN } = process.env;

import DiscordClient from './Structures/Client.js';
const client = new DiscordClient();

client.start(DISCORD_TOKEN);