import { MessageEmbed, TextChannel } from 'discord.js';
import { ICommand } from 'wokcommands'

export default {
    category: 'Moderation',
    description: 'Move message from 1 channel to another.',
    slash: true,
    guildOnly: true,
    permissions: ['MANAGE_MESSAGES'],
    options: [
        { name: 'channel', description: 'The channel id or mention to move the message to.', type: 'CHANNEL', required: true },
        { name: 'message', description: 'The message id needed to be moved.', type: 'STRING', required: true }
    ],
    callback: async ({ interaction }) =>
    {
        const destinationChannel = interaction.options.getChannel('channel') as TextChannel,
            chosenMessageId = interaction.options.getString('message');

        const m = await interaction.channel?.messages.fetch(chosenMessageId as string).catch(_ => undefined);

        if (!m) return interaction.reply({ content: `Cannot find message with ID of: \`${chosenMessageId}\``, ephemeral: true })

        const e = new MessageEmbed()
            .setAuthor({ name: m?.author.tag as string, iconURL: m?.author.avatarURL() || m?.author.defaultAvatarURL })
            .setDescription('**CONTENT:**\n' + m?.content)
            .addField('Moved by', interaction.user.toString())
            .setFooter(m?.author.id as string)
            .setTimestamp(m?.createdAt)

        if (m?.attachments.size || m?.embeds.length)
            e.description += '\n(*attachments existed but are not included*)';

        await destinationChannel.send({ embeds: [e] });

        if (m.deletable) await m.delete();

        return interaction.reply({ content: `Message has been moved to: ${destinationChannel}`, ephemeral: true });
    }
} as ICommand