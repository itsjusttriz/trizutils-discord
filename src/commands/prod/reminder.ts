import { Constants, MessageEmbed, GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Utility',
    description: 'Posts embedded reminders.',
    slash: true,
    guildOnly: true,
    options: [
        { name: 'message', description: 'A Message to post.', required: true, type: Constants.ApplicationCommandOptionTypes.STRING },
        { name: 'target', type: Constants.ApplicationCommandOptionTypes.USER, required: false, description: 'A User to mention.' }
    ],

    callback: async ({ interaction }) =>
    {
        const member = interaction.member as GuildMember;
        const target = interaction.options.getMember('target') as GuildMember || member;
        const m = interaction.options.getString('message');
        const e = new MessageEmbed()
            .setAuthor({ "name": member?.user.username as string, "iconURL": member?.user.displayAvatarURL() })
            .setDescription(`**To:**\n${target}\n\n**Reminder:**\n${m}`)
            .setThumbnail(target?.user.displayAvatarURL())
            .setTimestamp()

        return e;
    }
} as ICommand