import ClientManager from "../Utils/ClientManager.js";
import chat from "./Events/chat.js";

async function init() {

    const TMIClient = ClientManager.TwitchClient.TMI,
        APIClient = ClientManager.TwitchClient.API;

    TMIClient.connect().then(data => {

        console.log(`Connected to Twitch via: ${data}.`);

    }).catch(err => {

        console.error(err);

    });

    // TODO: Command Handler

    // TODO: Event Handler
    TMIClient.on("chat", chat);

}

export default { init }