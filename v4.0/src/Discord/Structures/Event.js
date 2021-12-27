import Discord from 'discord.js';
import DiscordClient from './Client.js';


/**
 * @template {keyof ClientEvents} K
 * @param {DiscordClient} client 
 * @param {Discord.ClientEvents[K]} eventArgs 
 */
function RunFunction(client, ...eventArgs) { }


/**
 * @template {keyof ClientEvents} K
 */
class Event {


    /**
     * @param {K} name 
     * @param {RunFunction<K>} run 
     */
    constructor(name, run) {
        this.name = name;
        this.run = run;
    }
}

export default Event;