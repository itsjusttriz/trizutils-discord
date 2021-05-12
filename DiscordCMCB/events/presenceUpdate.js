import { GuildManager } from '../util/ImportManager.js';

export default async function (client, oldPresence, newPresence) {

    if (newPresence.guild.id === client.guildIdList.get('nightshade_alley')) {
        (await GuildManager.NIGHTSHADE_ALLEY).handlePresenceUpdate(client, oldPresence, newPresence);
    } else if (newPresence.guild.id === client.guildIdList.get('blitzyuk')) {
        (await GuildManager.BLITZYUK).handlePresenceUpdate(client, oldPresence, newPresence);
    } else if (newPresence.guild.id === client.guildIdList.get('finnarmy')) {
        (await GuildManager.FINNARMY).handlePresenceUpdate(client, oldPresence, newPresence);
    } else if (newPresence.guild.id === client.guildIdList.get('toxicbunch')) {
        (await GuildManager.TOXICBUNCH).handlePresenceUpdate(client, oldPresence, newPresence);
    }
}