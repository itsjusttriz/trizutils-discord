import { GuildManager } from '../util/ImportManager.js';

export default async function (client, oldState, newState) {
    if (oldState.guild.id === client.guildIdList.get('nightshade_alley')) {
        return;
    } else if (oldState.guild.id === client.guildIdList.get('cmcb_official')) {
        (await GuildManager.CMCB_OFFICIAL).handleVoiceStateUpdate(client, oldState, newState);
    }
}