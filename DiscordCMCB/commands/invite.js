import * as Discord from 'discord.js';
import chalk from 'chalk';

export default {
    name: "invite",
    usage: "n!invite",
    description: 'DMs you the invite link for the bot',
    permissions: 'VIEW_CHANNEL',
    hidden: false,
    run(client, message, args) {

        message.delete({ timeout: 1000 })

        let embed = new Discord.MessageEmbed()
            .setTitle(`Invite Nottriz CMCB`)
            .setDescription('Click [Here](https://discord.com/api/oauth2/authorize?client_id=763135917329743903&permissions=499641462&scope=bot) to Invite Bot to Your server!')
            .setAuthor(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL())
            .setColor(message.member.displayHexColor ?? '#FEFEFE')
            .setFooter(`Command used in ${message.guild.name}`)
            .setTimestamp()

        message.channel.send('Sending response via DMs...').then(msg => msg.delete({ timeout: 5000 }));

        return message.author.send(embed).then(() =>
            console.log(chalk.yellow(`[CMD] App Invite sent to ${message.author.tag}`))
        ).catch(() => {
            console.log(chalk.red(`Cannot send DM to ${message.author.tag}`))
            message.channel.send(`Could not send ${message.author.toString()} a DM.`).then(msg => msg.delete({ timeout: 10000 }))
        })
    }
}