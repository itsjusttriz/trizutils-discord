import { Constants, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'WIP',
    description: 'Send embed',
    slash: true,
    guildOnly: true,
    ownerOnly: true,

    options: [
        {
            name: 'json-string',
            required: true,
            description: 'JSON string to parse.',
            type: Constants.ApplicationCommandOptionTypes.STRING
        }
    ],

    callback: ({ text }) =>
    {
        const json = JSON.parse(text);
        if (!json['description']) json['description'] = '\u200b';

        const embed = new MessageEmbed(json)

        return embed
    }
} as ICommand