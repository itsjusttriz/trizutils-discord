import DiscordJS, { Intents } from 'discord.js';
import WOKCommands from 'wokcommands';
import path from 'path';
import * as config from './config.json';

const client = new DiscordJS.Client({
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
        testServers: [...config['TEST_GUILDS']],
        mongoUri: config['MONGO_URI'],
        botOwners: config['OWNER_ID']
    })
        .setTagPeople(true)
        .setDisplayName('TrizUtils')
        .setCategorySettings([
            {
                name: 'WIP',
                emoji: '🛠️'
            },
            {
                name: 'Information',
                emoji: 'ℹ️'
            },
            {
                name: 'API',
                emoji: '🔗'
            },
            {
                name: 'Miscellaneous',
                emoji: '🤔'
            },
            {
                name: 'Utility',
                emoji: '💡'
            },
            {
                name: 'Management',
                emoji: '🚧'
            }
        ])
})

client.login(config['TOKEN'])