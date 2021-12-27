import Discord from 'discord.js';
import DiscordClient from './Client.js';
/**
 * @param {Discord.Message | Discord.Interaction} message 
 * @param {string[]} args 
 * @param {DiscordClient} client 
 */
function RunFunction(message, args, client) { }

class Command {

    /**
     * @typedef {{name: string, description: string, run: RunFunction}} CommandOptions
     * @param {CommandOptions} options 
     */

    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.run = options.run;
    }
};

export default Command;