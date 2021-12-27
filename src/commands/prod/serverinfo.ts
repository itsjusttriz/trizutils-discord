import { Constants, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Management',
    description: 'Send server-info embed',
    permissions: ['ADMINISTRATOR'],
    slash: true,
    guildOnly: true,

    options: [
        {
            name: 'gamename',
            required: true,
            description: 'Name of Game/Modpack/DLC',
            type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: 'ip',
            required: true,
            description: 'IP of the Server',
            type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: 'gameversion',
            required: true,
            description: 'Version of the Base game.',
            type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: 'password',
            required: false,
            description: 'Password of the Server',
            type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: 'addonversion',
            required: false,
            description: 'Version of the Modpack/DLC.',
            type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: 'map',
            required: false,
            description: 'Designated Map for Game/Modpack/DLC',
            type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: 'thumbnail',
            required: false,
            description: 'Thumbnail of instance.',
            type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: 'notes',
            required: false,
            description: 'Additional Notes.',
            type: Constants.ApplicationCommandOptionTypes.STRING
        }
    ],

    callback: ({ interaction }) =>
    {
        const nameOfGame = interaction.options.getString('gamename');
        const ip = interaction.options.getString('ip');
        const password = interaction.options.getString('password');
        const gameVersion = interaction.options.getString('gameversion');
        const dlcVersion = interaction.options.getString('addonversion');
        const map = interaction.options.getString('map');
        const thumbnail = interaction.options.getString('thumbnail');
        const notes = interaction.options.getString('notes');

        const embed = new MessageEmbed()
            .setDescription(`**${nameOfGame} Server Info**`)
            .setTimestamp()

        if (ip)
        {
            embed.addField('IP', ip as string, false)
        }
        if (password)
        {
            embed.addField('Password', `||\`${password}\`||`, false)
        }
        if (gameVersion)
        {
            embed.addField('Game Version', gameVersion as string, true)
        }
        if (dlcVersion)
        {
            embed.addField('Modpack/DLC Version', dlcVersion as string, true)
        }
        if (map)
        {
            embed.addField('Map', map as string, true)
        }
        if (thumbnail)
        {
            const urlProtocol = (thumbnail as string).startsWith('http') ? '' : 'https://';
            embed.setThumbnail(urlProtocol + thumbnail as string)
        }
        embed.addField('Notes', `>>> - General Rules apply.\n ${notes?.split(', ')?.join('\n-') || ''}`, false)

        return embed
    }
} as ICommand