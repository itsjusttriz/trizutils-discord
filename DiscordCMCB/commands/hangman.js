import { HangmanGame } from '../games/hangman.js';

const Hangman = new HangmanGame()

export default {
    name: "hangman",
    usage: "n!hangman",
    description: 'Hangman via Reactions. Brought to you by [TurkeyDev](https://discord.gg/DkexpJj).',
    permissions: 'VIEW_CHANNEL',
    requiredArgs: '',
    hidden: false,
    run(client, message, args) {
        message.delete({ timeout: 1000 })

        const ignoreGuilds = [client.guildIdList.get('cmcb_official')];

        // Ignore certain guilds.
        // if (ignoreGuilds.indexOf(message.guild.id) > -1) return;

        // Do special things in certain guilds.
        if (message.guild.id === client.guildIdList.get('nightshade_alley')) {
            if (!message.member.roles.cache.has('731621646653325363')) return;
        }

        switch (args[0]) {
            case 'end':
            case 'stop':
                Hangman.gameOver();
                break;
            default:
                Hangman.newGame(client, message);
                break;
        }
    }
}