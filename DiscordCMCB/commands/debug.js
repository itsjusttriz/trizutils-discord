import { MessageEmbed } from "discord.js";

export default {
    name: "debug",
    usage: "n!debug",
    description: 'Shows debug info',
    permissions: 'VIEW_CHANNEL',
    hidden: false,
    run(client, message, args) {
        if (message.author.id !== client.config.botOwnerId) return;

        message.delete({ timeout: 1000 })

        const embed = new MessageEmbed()
            .setTitle(`Debug Info`)
            .setTimestamp()
            .setColor(message.member.displayHexColor ?? '#FEFEFE')
            .setFooter('\u200B', message.author.displayAvatarURL())
            .addField('Version', `v${client.config.botVersion}`, true)
            .addField('Uptime', `${process.uptime() / 60} minutes`)

        return message.channel.send(embed);
    }
}