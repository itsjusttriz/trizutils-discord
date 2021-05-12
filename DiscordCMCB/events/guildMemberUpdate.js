import { GuildManager } from '../util/ImportManager.js';

export default async function (client, oldMember, newMember) {
    if (oldMember.guild.id === client.guildIdList.get('nightshade_alley')) {
        (await GuildManager.NIGHTSHADE_ALLEY).handleGuildMemberUpdate(client, oldMember, newMember)
    } else if (oldMember.guild.id === client.guildIdList.get('cmcb_official')) {
        (await GuildManager.CMCB_OFFICIAL).handleGuildMemberUpdate(client, oldMember, newMember);
    } else
        return;
}