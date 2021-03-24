import { MessageEmbed } from "discord.js";

export default {
    name: "serverinfo",
    usage: "n!serverinfo <...args>",
    description: 'Creates information embed for a game server',
    permissions: 'ADMINISTRATOR',
    hidden: false,
    run(client, message, args) {
        message.delete({ timeout: 5000 })

        if (message.author.id !== client.config.botOwnerId && this.permissions.indexOf(message.member.permissions) < 0) return message.reply(`You must have one of the following permissions to use this command: \`${this.permissions.join(' | ')}\``).then(m => m.delete({ timeout: 1000 * 10 }))

        let serverTitle = message.content.match(/-name "([^"]*)"/)
        let serverStatus = message.content.match(/-status "([^"]*)"/)
        let serverIP = message.content.match(/-ip "([^"]*)"/)
        let serverPort = message.content.match(/-port "([^"]*)"/)
        let serverPassword = message.content.match(/-password "([^"]*)"/)
        let serverGameVersion = message.content.match(/-gameversion "([^"]*)"/)
        let serverMPVersion = message.content.match(/-mpversion "([^"]*)"/)
        let serverRules = message.content.match(/-rules "([^"]*)"/)
        let serverDownload = message.content.match(/-download "([^"]*)"/)
        let serverIssueTracker = message.content.match(/-issues "([^"]*)"/)
        let serverGuidance = message.content.match(/-guidance "([^"]*)"/)


        const embed = new MessageEmbed()
            .setFooter('NEW!')
            .setTimestamp()
            .setColor(message.member.displayHexColor ?? '#FEFEFE')

        if (serverTitle) {
            embed.setTitle(serverTitle?.[1].toString())
        }
        if (serverStatus) {
            embed.addField('Status', serverStatus?.[1].toString(), true)
        }

        if (serverIP) {
            embed.addField('IP', serverIP?.[1].toString(), true)
        }

        if (serverPort) {
            embed.addField('Port', serverPort?.[1].toString(), true)
        }

        if (serverPassword) {
            embed.addField('Password', serverPassword?.[1].toString(), true)
        }

        if (serverGameVersion) {
            embed.addField('Game Version', serverMCVersion?.[1].toString(), true)
        }

        if (serverMPVersion) {
            embed.addField('Modpack Version', serverMPVersion?.[1].toString(), true)
        }

        if (serverRules) {
            embed.addField('Notes // Rules', serverRules?.[1].toString(), false)
        }

        if (serverDownload) {
            embed.addField('Download', `[Click Here](${serverDownload?.[1].toString()})`, true)
        }

        if (serverIssueTracker) {
            embed.addField('Issue Tracker', `[Click Here](${serverIssueTracker?.[1].toString()})`, true)
        }

        if (serverGuidance) {
            embed.addField('Guidance', `[Click Here](${serverGuidance?.[1].toString()})`, true)
        }
        return message.reply(`creating embed... your message will be deleted in 5 seconds...`).then(m => setTimeout(() => m.edit('', embed), 1000 * 3))
    }
}