import { Constants, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Management',
    description: 'Send server-info embed',
    permissions: ['ADMINISTRATOR'],
    slash: true,
    guildOnly: true,

    options: [
        { name: 'gamename', required: true, description: 'Name of Game/Modpack/DLC', type: 'STRING' },
        { name: 'ip', required: true, description: 'IP of the Server', type: 'STRING' },
        { name: 'gameversion', required: true, description: 'Version of the Base game.', type: 'STRING' },
        { name: 'password', required: false, description: 'Password of the Server', type: 'STRING' },
        { name: 'addonversion', required: false, description: 'Version of the Modpack/DLC.', type: 'STRING' },
        { name: 'map', required: false, description: 'Designated Map for Game/Modpack/DLC', type: 'STRING' },
        { name: 'thumbnail', required: false, description: 'Thumbnail of instance.', type: 'STRING' },
        { name: 'notes', required: false, description: 'Additional Notes.', type: 'STRING' }
    ],

    callback: ({ interaction }) =>
    {
        const nameOfGame = interaction.options.getString('gamename') as string;
        const ip = interaction.options.getString('ip') as string;
        const password = interaction.options.getString('password') as string;
        const gameVersion = interaction.options.getString('gameversion') as string;
        const dlcVersion = interaction.options.getString('addonversion') as string;
        const map = interaction.options.getString('map') as string;
        const thumbnail = interaction.options.getString('thumbnail') as string;
        const notes = interaction.options.getString('notes') as string;

        const e = new MessageEmbed().setDescription(`**${nameOfGame} Server Info**`).setTimestamp()

        if (ip)
            e.addField('IP', ip, false)
        if (password)
            e.addField('Password', `||\`${password}\`||`, false)
        if (gameVersion)
            e.addField('Game Version', gameVersion, true)
        if (dlcVersion)
            e.addField('Modpack/DLC Version', dlcVersion, true)
        if (map)
            e.addField('Map', map, true)
        if (thumbnail)
        {
            const urlProtocol = thumbnail.startsWith('http') ? '' : 'https://';
            e.setThumbnail(urlProtocol + thumbnail)
        }
        e.addField('Notes', `>>> - General Rules apply.\n ${notes?.split(', ')?.join('\n-') || ''}`, false)

        return e
    }
} as ICommand