import { Constants, GuildMember, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import { Poll } from '../../Utils/Schemas';

export default {
    category: 'WIP',
    description: 'Poll Command',
    slash: true,
    testOnly: true,
    ownerOnly: true,
    options: [
        {
            name: 'option',
            required: true,
            description: 'Specify whether to create/delete/edit a poll.',
            type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: 'question',
            required: true,
            description: 'Ask your question.',
            type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: 'id',
            required: false,
            description: 'Perform actions for a poll depending on this ID.',
            type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: 'choices',
            required: false,
            description: 'Declare the allowed choices for your poll e.g. Choice1|Choice2|etc',
            type: Constants.ApplicationCommandOptionTypes.STRING
        }
    ],

    callback: async ({ interaction }) =>
    {
        const option = interaction.options.getString('option', true) as string;
        const question = interaction.options.getString('question', true) as string;
        const id = interaction.options.getString('id', false) as string || Math.floor(100000 + Math.random() * 900000);;
        const choices = (interaction.options.getString('choices', false) as string)?.split('|');

        const author = (interaction.member as GuildMember).user;

        const testEmbed = new MessageEmbed({ description: '\u200b' })

        switch (option)
        {
            case 'create':
                testEmbed
                    .setTitle(question)
                    .setAuthor(author?.username as string, author?.avatarURL() || author?.defaultAvatarURL)
                    .setDescription(
                        choices.length
                            ? choices?.map((val, i) =>
                            {
                                return `**[${i + 1}]** ${val}`;
                            }).join('\n')
                            : '\u200b'
                    )
                    .setFooter(`Poll ID: ${id}`)
                    .setTimestamp()

                const newPoll = new Poll({
                    guildId: interaction.guildId,
                    authorId: interaction.member?.user.id,
                    data: {
                        question: question,
                        choices: choices
                    }
                });

                await newPoll.save();

                interaction.reply({ embeds: [testEmbed] })
                break;

            default:
                break;
        }
    }
} as ICommand