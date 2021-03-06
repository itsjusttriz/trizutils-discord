import { Client, Intents } from 'discord.js';
import WOKCommands from 'wokcommands';
import path from 'path';
import config from './config.json';

const { TEST_GUILDS, MONGO_URI, OWNER_ID, TOKEN } = config;

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES
    ]
});

client.on('ready', () =>
{
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        typeScript: true,
        testServers: [...TEST_GUILDS],
        mongoUri: MONGO_URI,
        botOwners: OWNER_ID
    })
        .setTagPeople(true)
        .setDisplayName('TrizUtils')
        .setCategorySettings([
            { name: 'WIP', emoji: 'đ ī¸' },
            { name: 'Information', emoji: 'âšī¸' },
            { name: 'API', emoji: 'đ' },
            { name: 'Miscellaneous', emoji: 'đ¤' },
            { name: 'Utility', emoji: 'đĄ' },
            { name: 'Management', emoji: 'đ§' }
        ])
})

client.login(TOKEN)