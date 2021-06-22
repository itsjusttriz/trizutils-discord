import LoggerManager from "../../Utils/LoggerManager.js";
import { ChatUserstate, Client } from "tmi.js";
import ClientUtils from "../../Utils/ClientUtils.js";
import ClientManager from "../../Utils/ClientManager.js";

export default async function (TMIClient: Client, channel: string, userstate: ChatUserstate, message: string, self: boolean) {

    // Split sentence into an array of words/args.
    const args = message.slice(ClientUtils.Twitch.self.getPrefix.length).trim().split(/ +/g);

    // Guarantee the 1st arg to be the 'command', and remove it from the previous array.
    const command = args.shift()?.toLowerCase();

    const options = {
        TMIClient,
        APIClient: ClientManager.TwitchClient.API,
        channel,
        userstate,
        message,
        self,
        args,
        command,
        isVip: userstate.badges?.vip,
        isSubOrFounder: userstate.subscriber || userstate.badges?.subscriber || userstate.badges?.founder,
        isMod: userstate.mod || userstate.badges?.moderator || userstate["user-type"] === 'mod',
        isCaster: userstate.badges?.broadcaster || userstate['room-id'] === userstate["user-id"],
        isStaff: userstate.badges?.global_mod || userstate.badges?.admin || userstate.badges?.staff,
        isBotAdmin: ClientUtils.Twitch.botAdmin.includes(userstate['username']!)
    };

    // Log messages to console.
    LoggerManager.TwitchLogOptions.GenericMessageLog(options);

    // TODO: Add BlacklistedTerms();
    // TODO: Add ExtraCommands();

    // Don't listen to my own messages..
    if (self) return;

    // Ignore messages not starting with the prefix (in .env file)
    if (!message.startsWith(ClientUtils.Twitch.self.getPrefix(process.env))) return;

    // Define 'cmd'.
    const cmd = await ClientManager.TwitchClient.CommandMap.get(command);

    // If command is known, run it. Otherwise, ignore.
    if (!cmd) return;

    // If HandlerManager returns falsy, ignore.
    // TODO: if (HandlerManager.cache['message']?.[channel] == false) return;

    // If all previous null-checks have been passed, respond to command.
    cmd.default.run(options);
}