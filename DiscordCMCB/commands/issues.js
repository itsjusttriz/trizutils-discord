import { MessageEmbed } from "discord.js";
import chalk from 'chalk';

export default {
    name: "issues",
    usage: "n!issues",
    description: 'DMs the link to the bot\'s issue tracker.',
    permissions: 'VIEW_CHANNEL',
    hidden: false,
    run(client, message, args) {
        message.delete({ timeout: 1000 })

        const embed = new MessageEmbed()
            .setTitle('CMCB Issue Tracker')
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setColor(message.member.displayHexColor ?? '#FEFEFE')
            .setFooter(`Command used in ${message.guild.name}`)
            .setTimestamp()
            .setDescription(`[Click Here](https://itsjusttriz.github.io/rd/issues/) to view the Issue Tracker for both the /twitch & /discord CMCB Bots.`)

        message.channel.send('Sending response via DMs...').then(msg => msg.delete({ timeout: 5000 }));

        return message.author.send(embed).then(() =>
            console.log(chalk.yellow(`[CMD] IssueTracker sent to ${message.author.tag}`))
        ).catch(() => {
            console.log(chalk.red(`Cannot send DM to ${message.author.tag}`))
            message.channel.send(`Could not send ${message.author.toString()} a DM.`).then(msg => msg.delete({ timeout: 10000 }))
        })
    }
}