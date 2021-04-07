import guildFileImports from '../datapull/guildFileImports.js';

export default async function (client, oldPresence, newPresence) {

    if (newPresence.guild.id === client.guildIdList.get('nightshade_alley')) {
        (await guildFileImports.NIGHTSHADE_ALLEY).handlePresenceUpdate(client, oldPresence, newPresence);
    } else if (newPresence.guild.id === client.guildIdList.get('blitzyuk')) {
        (await guildFileImports.BLITZYUK).handlePresenceUpdate(client, oldPresence, newPresence);
    } else if (newPresence.guild.id === client.guildIdList.get('finnarmy')) {
        (await guildFileImports.FINNARMY).handlePresenceUpdate(client, oldPresence, newPresence);
    }
}