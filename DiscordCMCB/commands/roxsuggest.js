import { MessageEmbed } from "discord.js";

export default {
    name: 'roxsuggest',
    usage: 'n!roxsuggest <msg/link>',
    description: 'Suggest a rox design.',
    permissions: 'SEND_MESSAGES',
    requiredArgs: '<msg/link>',
    hidden: false,
    run(client, message, args) {
        const requiredChannel = message.guild.channels.cache.find(c => c.name === 'rox-suggestions');

        if (!requiredChannel) return message.reply(`Cannot find a channel named \`rox-suggestions\`! Please ask a member of staff to create one and/or provide me with access to said channel.`);

        if (!args[0]) return message.reply(`Missing Parameters: \`${this.requiredArgs}\`.`);

        const embed = new MessageEmbed()
            .setAuthor(message.author.name, message.author.displayAvatarURL())
            .setTitle('Rox Suggestion')
            .setDescription(args.join(' '))
            .setTimestamp()
            .setColor(message.member.displayHexColor)

        return requiredChannel.send(embed);
    }
}