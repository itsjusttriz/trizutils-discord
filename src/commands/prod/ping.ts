import { ICommand } from "wokcommands";

export default {
    category: 'Information',
    description: 'Returns Pong.',
    slash: true,
    guildOnly: true,

    callback: ({ }) =>
    {
        return {
            content: 'Pong!',
            ephemeral: true
        };
    }
} as ICommand