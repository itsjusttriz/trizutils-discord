import { MessageEmbed } from "discord.js";
import * as Discord from 'discord.js';

export default {
    name: "eval",
    usage: "n!eval <query>",
    description: 'Runs the JS eval() function on your Input',
    async run(client, message, args) {
        if (message.author.id !== client.config.botOwnerId) return;

        message.delete({ timeout: 1000 })

        let result = await eval(args.join(' '))

        const embed = new MessageEmbed()
            .setTitle('JS Snippet')
            .setTimestamp()
            .setColor(message.member.displayHexColor ?? '#FEFEFE')
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .addField('Input', `\`\`\`js\n${args.join(' ')}\`\`\``)
            .addField('Output', `\`\`\`js\n${result.toString()}\`\`\``)

        return message.channel.send(embed);
    }
}