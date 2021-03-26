import * as Discord from 'discord.js';
import chalk from 'chalk';

export default {
    name: "support",
    usage: "n!support",
    description: 'DMs the link to the CMCB_Official Discord Server',
    permissions: 'VIEW_CHANNEL',
    requiredArgs: '',
    hidden: false,
    run: function (client, message, args) {

        message.delete({ timeout: 5000 });

        const embed = new Discord.MessageEmbed()
            .setTitle('Join the Discord!')
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setColor(message.member.displayHexColor ?? '#FEFEFE')
            .setFooter(`Command used in ${message.guild.name}`)
            .setTimestamp()
            .setDescription('[Click Here](https://nottriz.weebly.com/support) to join the Official CMCB Discord server to get support with any issues that may arise within both the Twitch and Discord ends of Nottriz CMCB.');

        message.channel.send('Sending response via DMs...').then(msg => msg.delete({ timeout: 5000 }));

        return message.author.send(embed).then(() => console.log(chalk.yellow(`[CMD] Support Server Invite sent to ${message.author.tag}`))
        ).catch(() => {
            console.log(chalk.red(`Cannot send DM to ${message.author.tag}`));
            message.channel.send(`Could not send ${message.author.toString()} a DM.`).then(msg => msg.delete({ timeout: 10000 }));
        });
    }
}