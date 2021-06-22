import { Client } from "tmi.js";
import LoggerManager from "../../Utils/LoggerManager.js";

export default async function (TMIClient: Client, channel: string, username: string, self: boolean) {
    if (!self) return;

    const str: string = `===> Joined ${channel} <===`;

    LoggerManager.TwitchLogOptions.GenericJoinLog(username, str);

    try {

        await TMIClient.action('nottriz', str);

    } catch (e) {

        console.error(e)

    }
};