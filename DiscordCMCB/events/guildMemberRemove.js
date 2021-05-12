import { GuildManager } from '../util/ImportManager.js';

export default async function (client, member) {
    if (member.guild.id === client.guildIdList.get('nightshade_alley')) {
        (await GuildManager.NIGHTSHADE_ALLEY).handleGuildMemberRemove(client, member);
    } else if (member.guild.id === client.guildIdList.get('cmcb_official')) {
        (await GuildManager.CMCB_OFFICIAL).handleGuildMemberRemove(client, member);
    } else
        return;
}