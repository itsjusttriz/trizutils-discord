import { Client } from "tmi.js";
import LoggerManager from "../../Utils/LoggerManager.js";

export default async function (TMIClient: Client, channel: string, username: string, self: boolean) {
    if (!self) return;

    const str: string = `<=== Left ${channel} ===>`;

    LoggerManager.TwitchLogOptions.GenericPartLog(username, str);

    try {

        await TMIClient.action('nottriz', str);

    } catch (e) {

        console.error(e)

    }
};