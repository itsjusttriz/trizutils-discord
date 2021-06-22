import { ChatUserstate, Client } from "tmi.js";
import ChannelEventManager from "../../Utils/ChannelEventManager.js";
import LoggerManager from "../../Utils/LoggerManager.js";

export default async function (TMIClient: Client, channel: string, userstate: ChatUserstate, message: string) {
    const opts = {
        TMIClient,
        channel,
        userstate,
        message,
        defaultResponse: `coxHypers x${userstate.bits}`
    }

    if (!(await ChannelEventManager[channel.replace('#', '')])?.default?.['cheer']) return;

    LoggerManager.TwitchLogOptions.GenericCheerLog(opts);
    (await ChannelEventManager[channel.replace('#', '')])?.default?.['cheer']?.(opts);

};