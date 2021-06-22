import { Message } from "discord.js";
import ClientManager from "../../Utils/ClientManager.js";
import ClientUtils from "../../Utils/ClientUtils.js";
// import TurkeysDiscordGames from "turkeydev_discordgames";

export default async function (message: Message) {
    const prefix = ClientUtils.Discord.self.getPrefix(process.env);
    // Ignore all bots
    if (message.author.bot) return;

    // Ignore DMs
    if (!message.guild) return;

    // TurkeysDiscordGames(message);

    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(prefix) !== 0)
        return;

    // Our standard argument/command name definition.
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift()?.toLowerCase();

    // Grab the command data from the client.commands Enmap
    const cmd = await ClientManager.DiscordClient.CommandMap.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd)
        return;

    // Run the command
    cmd.default.run(ClientManager.DiscordClient, message, args)
}