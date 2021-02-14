import { MessageEmbed } from "discord.js";

export default {
    name: "roadmap",
    usage: "n!roadmap",
    description: 'DMs the link to the bot roadmap',
    run(client, message, args) {
        message.delete({ timeout: 1000 })

        const embed = new MessageEmbed()
            .setTitle('CMCB Development Roadmap')
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setColor(message.author.displayHexColor ?? '#FEFEFE')
            .setFooter(`Command used in ${message.guild.name}`)
            .setTimestamp()
            .setDescription(`[Click Here](https://nottriz.weebly.com/roadmap) to view the current roadmap for the development of the both the /twitch & /discord CMCB Bots.`)

        message.channel.send('Sending response via DMs...').then(msg => msg.delete({ timeout: 5000 }));

        return message.author.send(embed).then(() =>
            console.log(chalk.yellow(`[CMD] Roadmap sent to ${message.author.tag}`))
        ).catch(() => {
            console.log(chalk.red(`Cannot send DM to ${message.author.tag}`))
            message.channel.send(`Could not send ${message.author.toString()} a DM.`).then(msg => msg.delete({ timeout: 10000 }))
        })
    }
}