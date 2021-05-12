import { PublicStreamManager } from "../../util/Public-TwitchStreamManager.js";

const guildChannelMap = new Map([
    ['mainLogChannel', '667483146417209344'],
    ['publicLiveChannel', '408488682752835607']
]);

const guildRoleMap = new Map([
    ['liveRole', '565978951646969866'],
    ['streamerRole', '527586901343993888']
])

export async function handlePresenceUpdate(client, oldPresence, newPresence) {

    // await testPresence(client, oldPresence, newPresence);

    await PublicStreamManager.init(client, oldPresence, newPresence, guildChannelMap.get('publicLiveChannel'), guildRoleMap.get('streamerRole'), guildRoleMap.get('liveRole'));
}
