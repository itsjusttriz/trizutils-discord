import LoggerManager from "../../Utils/LoggerManager.js";
import { ChatUserstate } from "tmi.js";

export default function (channel: string, userstate: ChatUserstate, message: string, self: boolean) {

    const options = {
        channel,
        userstate,
        message,
        self,
        isSubOrFounder: userstate.subscriber || userstate.badges?.subscriber || userstate.badges?.founder,
        isMod: userstate.mod || userstate.badges?.moderator || userstate["user-type"] === 'mod',
        isCaster: userstate.badges?.broadcaster || userstate['room-id'] === userstate["user-id"],
        isStaff: userstate.badges?.global_mod || userstate.badges?.admin || userstate.badges?.staff
    };

    // Log things.
    LoggerManager.TwitchChatOptions.Log(options);

    // Don't listen to my own messages..
    if (self) return;

    // Do your stuff.

}