import { CommandInteraction, Constants } from "discord.js";
import { ICommand } from "wokcommands";
// @ts-ignore
import fetch from 'node-fetch';

export default {
    category: 'WIP',
    description: 'Adds a modpack to the mongo database.',
    slash: true,
    testOnly: true,
    ownerOnly: true,

    options: [
        {
            name: 'pack-id',
            description: 'modpack ID',
            required: true,
            type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: 'pack-name',
            description: 'modpack Name',
            required: true,
            type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: 'pack-launcher',
            description: 'the main launcher this modpack can be found in.',
            required: true,
            type: Constants.ApplicationCommandOptionTypes.STRING,
            choices: [
                {
                    name: 'Curse',
                    value: 'CurseForge'
                },
                {
                    name: 'FTB',
                    value: 'FTBApp'
                }
            ]
        },
        {
            name: 'pack-url',
            description: 'The location of the modpack',
            required: true,
            type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: 'pack-dev',
            description: 'The developer of the modpack.',
            required: true,
            type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: 'pack-type',
            description: 'The status of this modpack.',
            required: true,
            type: Constants.ApplicationCommandOptionTypes.STRING
        }
    ],

    callback: async ({ interaction: msgInt }) =>
    {
        const qs = new URLSearchParams({
            id: await getString(msgInt, 'pack-id'),
            name: await getString(msgInt, 'pack-name'),
            launcher: await getString(msgInt, 'pack-launcher'),
            link: await getString(msgInt, 'pack-url'),
            dev: await getString(msgInt, 'pack-dev'),
            type: await getString(msgInt, 'pack-type')
        })

        const api = await fetch(`https://api.triz.link/minecraft/add?${qs}`);
        const text = await api.text();
        await msgInt.reply({
            ephemeral: true,
            content: text as string
        })
        return;
    }
} as ICommand

async function getString(interaction: CommandInteraction, string: ModpacksEnum)
{
    const str = interaction.options.getString(string) as string;
    if (!str) return 'null';

    return str;
}

type ModpacksEnum = 'pack-id' | 'pack-name' | 'pack-launcher' | 'pack-url' | 'pack-dev' | 'pack-type';