import { MessageEmbed } from "discord.js";
import { fromS } from "hh-mm-ss";

export default {
    name: "debug",
    usage: "n!debug",
    description: 'Shows debug info',
    permissions: 'VIEW_CHANNEL',
    requiredArgs: '',
    hidden: false,
    run(client, message, args) {
        if (message.author.id !== client.config.botOwnerId) return;
        const { heapTotal, heapUsed } = process.memoryUsage();

        message.delete({ timeout: 1000 })

        const embed = new MessageEmbed()
            .setTitle(`Debug Info`)
            .setTimestamp()
            .setColor(message.member.displayHexColor ?? '#FEFEFE')
            .setFooter('\u200B', message.author.displayAvatarURL())
            .addField('Uptime', fromS(process.uptime(), 'hh:mm:ss'))
            .addField('Memory Usage', [heapUsed, heapTotal].map(n => (n * 1e-6).toFixed(1)).join('/') + 'MB')
            .addField('Instance Version', `${client.config.botVersion}`, true)
            .addField('Node Version', process.version)

        return message.channel.send(embed);
    }
}