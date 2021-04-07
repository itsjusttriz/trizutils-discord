import { PublicStreamManager } from "../../util/Public-TwitchStreamManager.js";

const guildChannelMap = new Map([
    ['mainLogChannel', '744698836701806592'],
    ['publicLiveChannel', '587425956403085345']
]);

const guildRoleMap = new Map([
    ['liveRole', '744402791396671509'],
    ['approvedRole', '745724417887436861']
]);

export async function handlePresenceUpdate(client, oldPresence, newPresence) {
    await PublicStreamManager.init(client, oldPresence, newPresence, guildChannelMap.get('publicLiveChannel'), guildRoleMap.get('approvedRole'), guildRoleMap.get('liveRole'));
}
