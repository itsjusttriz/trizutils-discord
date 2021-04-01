import { MessageEmbed } from "discord.js";

export default {
    name: "serverinfo",
    usage: "n!serverinfo <...args>",
    description: 'Creates information embed for a game server',
    permissions: 'ADMINISTRATOR',
    requiredArgs: '<name> [status] <ip> [port] [password] <gameversion> [mpversion] <rules> [download] [issues] [guidance]',
    hidden: false,
    run(client, message, args) {
        message.delete({ timeout: 5000 })

        if (message.author.id !== client.config.botOwnerId && !message.member.permissions.has(this.permissions)) return message.reply(`You must have one of the following permissions to use this command: \`${this.permissions.join(' | ')}\``).then(m => m.delete({ timeout: 1000 * 10 }))

        let Title = message.content.match(/-name "([^"]*)"/)
        let Status = message.content.match(/-status "([^"]*)"/)
        let IP = message.content.match(/-ip "([^"]*)"/)
        let Port = message.content.match(/-port "([^"]*)"/)
        let Password = message.content.match(/-password "([^"]*)"/)
        let GameVersion = message.content.match(/-gameversion "([^"]*)"/)
        let MPVersion = message.content.match(/-mpversion "([^"]*)"/)
        let Rules = message.content.match(/-rules "([^"]*)"/)
        let Download = message.content.match(/-download "([^"]*)"/)
        let IssueTracker = message.content.match(/-issues "([^"]*)"/)
        let Guidance = message.content.match(/-guidance "([^"]*)"/)

        if (!args[0]) return message.reply(`Missing parameters: \`${this.requiredArgs}\` (*<> is required, [] is optional*).`);

        const embed = new MessageEmbed()
            .setFooter('NEW!')
            .setTimestamp()
            .setColor(message.member.displayHexColor ?? '#FEFEFE')

        if (Title) {
            embed.setTitle(Title?.[1].toString())
        }
        if (Status) {
            embed.addField('Status', Status?.[1].toString(), true)
        }

        if (IP) {
            embed.addField('IP', IP?.[1].toString(), true)
        }

        if (Port) {
            embed.addField('Port', Port?.[1].toString(), true)
        }

        if (Password) {
            embed.addField('Password', Password?.[1].toString(), true)
        }

        if (GameVersion) {
            embed.addField('Game Version', GameVersion?.[1].toString(), true)
        }

        if (MPVersion) {
            embed.addField('Modpack Version', MPVersion?.[1].toString(), true)
        }

        if (Rules) {
            embed.addField('Notes // Rules', Rules?.[1].toString(), false)
        }

        if (Download) {
            embed.addField('Download', `[Click Here](${Download?.[1].toString()})`, true)
        }

        if (IssueTracker) {
            embed.addField('Issue Tracker', `[Click Here](${IssueTracker?.[1].toString()})`, true)
        }

        if (Guidance) {
            embed.addField('Guidance', `[Click Here](${Guidance?.[1].toString()})`, true)
        }
        return message.reply(`Creating Embed... Your message will be deleted in 5 seconds.`).then(m => setTimeout(() => m.edit('', embed), 1000 * 3))
    }
}