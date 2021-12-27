import { Client, Collection, Intents } from 'discord.js';
import chalk from 'chalk';
import fs from 'fs'

import Command from './Command.js';
import Event from './Event.js';

class DiscordClient extends Client {
    constructor() {
        super({ intents: new Intents(32767) })

        /**
         * @type {Collection<string, Command>}
         */
        this.commands = new Collection()
    }

    start(token) {
        // ? Dynamically load command files.
        fs.readdirSync('./commands')
            .filter(f => f.endsWith('.js'))
            .forEach(async f => {
                /**
                 * @type {Command}
                 */
                const command = await import(`../commands/${f}`);
                this.log(`Command '${command.default.name}' loaded.`, 'info');
                this.commands.set(command.default.name, command.default);
            });

        // ? Dynamically load event files.
        fs.readdirSync('./events')
            .filter(f => f.endsWith('js'))
            .forEach(async f => {
                /**
                 * @type {Event}
                 */
                const event = await import(`../events/${f}`);
                this.log(`Event '${event.default.name}' loaded`, 'info');
                this.on(event.default.name, event.default.run.bind(null, this))
            })

        // ? Login to client.
        this.login(token)
    }

    log(string, type = 'info') {
        switch (type) {
            case 'info':
                console.log(
                    chalk.blueBright(string)
                );
                break;
            case 'warn':
                console.log(
                    chalk.yellowBright(string)
                );
                break;
            case 'error':
                console.log(
                    chalk.redBright(string)
                );
                break;
        }
    }
}

export default DiscordClient;