import { ICommand } from "wokcommands";

export default {
    category: 'Utility',
    description: 'Get Epoch timecode',
    slash: true,
    options: [{ name: 'timestring', description: 'Timestamp to convert.', type: 'STRING', required: true }],

    callback: ({ interaction }) =>
    {
        if (!interaction) return;

        const timestring = interaction.options.getString('timestring')
        if (!timestring) return interaction.reply({ content: 'Cannot find timestring in your message.', ephemeral: true });

        const reg = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}((\+|-)\d{2}:\d{2})?/;
        if (!reg.test(timestring)) return interaction.reply({ content: 'Your input does not meet timestring requirements e.g. yyyy-mm-ddT07:00', ephemeral: true })

        const time = new Date(timestring).getTime() / 1000;
        return interaction.reply({ content: `TimeString:\`${timestring}\`\nEpoch:\`${time}\`\nFormatted: <t:${time}>`, ephemeral: true })
    }
} as ICommand