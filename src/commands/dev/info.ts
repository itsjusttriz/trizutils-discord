import { MessageActionRow, MessageButton } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Information',
    description: 'Relays information about the bot.',

    slash: true,
    testOnly: true,

    callback: async ({ interaction }) =>
    {
        const text = 'This bot makes use of the WOKCommands npm package to handle it\'s commands, interactions & events.';

        const row1 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setEmoji('🗨️')
                    .setLabel('WornOffKeys Discord')
                    .setStyle('LINK')
                    .setURL('https://discord.com/invite/4HxdePR')
            )

        const row2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setEmoji('💬')
                    .setLabel('WOKCommands NPM Package')
                    .setStyle('LINK')
                    .setURL('https://www.npmjs.com/package/wokcommands')
            )

        const row3 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setEmoji('📖')
                    .setLabel('WOKCommands Documentation')
                    .setStyle('LINK')
                    .setURL('https://docs.wornoffkeys.com/')
            )

        await interaction.reply({
            content: text,
            components: [row1, row2, row3],
            ephemeral: true
        })
    }
} as ICommand