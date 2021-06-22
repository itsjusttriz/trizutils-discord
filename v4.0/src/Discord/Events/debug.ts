import ClientUtils from "../../Utils/ClientUtils.js";
import LoggerManager from "../../Utils/LoggerManager.js";

export default function (info: string) {
    if (!ClientUtils.Discord.debug) return;

    return LoggerManager.DiscordLogOptions.Log('debug', info);
}