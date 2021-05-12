import { GuildManager } from '../util/ImportManager.js';

export default async function (client, message) {
    if (message.guild.id === client.guildIdList.get('nightshade_alley')) {
        return;
    } else if (message.guild.id === client.guildIdList.get('cmcb_official')) {
        (await GuildManager.CMCB_OFFICIAL).handleMessageDelete(client, message);
    }
}