import * as dotEnv from 'dotenv';
import Twitch from "./Twitch/index.js";
import Discord from "./Discord/index.js";

dotEnv.config({ path: 'build/.env' });

// Launch TwitchBot.
Twitch.init(process.env);

// Launch DiscordBot.
Discord.init();