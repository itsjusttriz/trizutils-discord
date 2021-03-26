import { MessageEmbed } from "discord.js";
import { default as axios } from 'axios'

export default {
    name: "math",
    usage: "n!math <EquationWithNoSpaces>",
    description: 'Gives results of a given equation',
    permissions: 'VIEW_CHANNEL',
    requiredArgs: '<equation>',
    hidden: false,
    run(client, message, args) {
        message.delete({ timeout: 1000 })

        const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter(`Calculation`)

        if (!args) {
            embed.setTitle('ERROR')
            embed.setDescription(
                `:x: Equation was not provided! :x:
                
                **Example:**
                > **You:** \`n!math 2+2\`
                > **Nottriz:** \`2+2 = 4\``
            )
            embed.setColor('RED')

            return message.channel.send(message.author.toString(), embed).then(msg => { msg.delete({ timeout: 10000 }) });
        } else {
            axios.get(`http://twitch.center/customapi/math?expr=${encodeURI(args[0]).replace(/\+/g, '%2B')}`)
                .then(function (response) {
                    if (response.data == '???') return message.channel.send(`${message.author.toString()}, ${args[0]} = Invalid expression`).then(msg => msg.delete({ timeout: 5000 }));
                    embed.addFields(
                        { name: 'Equation', value: args[0] },
                        { name: 'Answer', value: response.data }
                    )
                    embed.setColor(message.member.displayHexColor ?? '#FEFEFE')

                    return message.channel.send(embed);
                })
                .catch(function (error) {
                    console.log(chalk.red(error))
                })
        }
    }
}