import { default as guildFiles } from '../datapull/guildFileImports.js';

export default async function (client, member) {
    if (member.guild.id === client.guildIdList.get('nightshade_alley')) {
        (await guildFiles.NIGHTSHADE_ALLEY).handleGuildMemberAdd(client, member);
    } else if (member.guild.id === client.guildIdList.get('cmcb_official')) {
        (await guildFiles.CMCB_OFFICIAL).handleGuildMemberAdd(client, member);
    } else
        return;
}