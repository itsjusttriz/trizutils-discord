import guildFileImports from '../datapull/guildFileImports.js';

export default async function (client, oldMember, newMember) {
    if (oldMember.guild.id === client.guildIdList.get('nightshade_alley')) {
        (await guildFileImports.NIGHTSHADE_ALLEY).handleGuildMemberUpdate(client, oldMember, newMember)
    } else if (oldMember.guild.id === client.guildIdList.get('cmcb_official')) {
        (await guildFileImports.CMCB_OFFICIAL).handleGuildMemberUpdate(client, oldMember, newMember);
    } else
        return;
}