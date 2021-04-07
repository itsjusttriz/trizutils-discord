import { PublicStreamManager } from "../../util/Public-TwitchStreamManager.js";

const guildChannelMap = new Map([
    ['mainLogChannel', '811815290580762634'],
    // ['roleLogChannel', '763918843021492265'],
    // ['joinLogChannel', '482301995408162817'],
    ['publicLiveChannel', '827758215558594570']
])

const guildRoleMap = new Map([
    ['liveRole', '826844757367849010'],
    ['streamerRole', '758348070030147585']
])

export async function handlePresenceUpdate(client, oldPresence, newPresence) {

    await PublicStreamManager.init(client, oldPresence, newPresence, guildChannelMap.get('publicLiveChannel'), guildRoleMap.get('streamerRole'), guildRoleMap.get('liveRole'));
}