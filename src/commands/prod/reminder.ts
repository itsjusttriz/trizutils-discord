import { Constants, MessageEmbed, GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Utility',
    description: 'Posts embedded reminders.',

    slash: true,
    guildOnly: true,

    options: [
        {
            name: 'message',
            description: 'A Message to post.',
            required: true,
            type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: 'target',
            type: Constants.ApplicationCommandOptionTypes.USER,
            required: false,
            description: 'A User to mention.'
        }
    ],

    callback: async ({ interaction }) => {
        const target = interaction.options.getMember('target') as GuildMember || interaction.member as GuildMember;
        const m = interaction.options.getString('message');
        const e = new MessageEmbed({
            author: {
                "name": (interaction.member as GuildMember)?.user.username as string,
                "iconURL": (interaction.member as GuildMember)?.user.displayAvatarURL()
            },
            description:
                '**To:**\n'
                + target?.user.username + '\n\n'
                + '**Reminder:**\n'
                + m as string,
            thumbnail: {
                url: target?.user.displayAvatarURL()
            },
            timestamp: new Date()
        })

        interaction.reply({
            embeds: [e]
        })
    }
} as ICommand