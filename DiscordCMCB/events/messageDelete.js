import guildFileImports from '../datapull/guildFileImports.js';

export default async function (client, message) {
    if (message.guild.id === client.guildIdList.get('nightshade_alley')) {
        return;
    } else if (message.guild.id === client.guildIdList.get('cmcb_official')) {
        (await guildFileImports.CMCB_OFFICIAL).handleMessageDelete(client, message);
    }
}