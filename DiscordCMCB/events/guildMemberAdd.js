import guildFileImports from '../datapull/guildFileImports.js';

export default async function (client, member) {
    if (member.guild.id === client.guildIdList.get('nightshade_alley')) {
        (await guildFileImports.NIGHTSHADE_ALLEY).handleGuildMemberAdd(client, member);
    } else if (member.guild.id === client.guildIdList.get('cmcb_official')) {
        (await guildFileImports.CMCB_OFFICIAL).handleGuildMemberAdd(client, member);
    } else
        return;
}