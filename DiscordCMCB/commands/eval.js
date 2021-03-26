import { MessageEmbed } from "discord.js";

export default {
    name: "eval",
    usage: "n!eval <query>",
    description: 'Runs the JS eval() function on your Input',
    permissions: '@botOwner',
    requiredArgs: '<query>',
    hidden: true,
    async run(client, message, args) {
        if (message.author.id !== client.config.botOwnerId) return;

        message.delete({ timeout: 1000 })

        if (!args[0]) return message.reply(`Missing Parameters: \`${this.requiredArgs}\``);

        let result = await eval(args.join(' '))

        const embed = new MessageEmbed()
            .setTitle('JS Snippet')
            .setTimestamp()
            .setColor(message.member.displayHexColor ?? '#FEFEFE')
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .addField('Input', `\`\`\`js\n${args.join(' ')}\`\`\``)
            .addField('Output', `\`\`\`js\n${result}\`\`\``)

        return message.channel.send(embed);
    }
}