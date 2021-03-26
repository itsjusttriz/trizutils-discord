import { MessageEmbed } from "discord.js";
import chalk from 'chalk';

export default {
    name: "help",
    usage: 'n!help [command]',
    description: 'Shows information about commands.',
    permissions: 'VIEW_CHANNEL',
    requiredArgs: '[command]',
    hidden: true,
    async run(client, message, args) {
        message.delete({ timeout: 3000 });

        const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle('Help - Commands')
            .setColor(message.member.displayHexColor ?? '#FEFEFE')
            .setTimestamp()

        if (!args[0]) {
            let arr = [];

            await client.commands.each(c => {

                if (c.default.hidden === true) return;
                if (message.member.permissions.toArray().indexOf(c.default.permissions) < 0) return;

                let element = `${client.config.prefix}**${c.default.name.toLowerCase()}**\n> *${c.default.description ?? 'Not Found'}*`;
                arr.push(element)

            })
            embed.setDescription(arr.join('\n'));
        } else {
            embed.setDescription(`**❯ Command**\n${client.commands.get(args[0].toLowerCase()).default.name ?? 'Unknown Command'}\n\n**❯ Usage**\n${`\`${client.commands.get(args[0].toLowerCase()).default.usage}\`` ?? 'Not Found'}\n\n**❯ Description**\n${client.commands.get(args[0].toLowerCase()).default.description ?? 'Not Found'}`)
        }
        message.reply('Sending response via DMs...').then(msg => msg.delete({ timeout: 5000 }));

        return message.author.send(embed).then(() => console.log(chalk.yellow(`[CMD] Help sent to ${message.author.tag}`))
        ).catch(() => {
            console.log(chalk.red(`Cannot send DM to ${message.author.tag}`));
            message.reply(`Could not send ${message.author.toString()} a DM.`).then(msg => msg.delete({ timeout: 10000 }));
        });
    }
}