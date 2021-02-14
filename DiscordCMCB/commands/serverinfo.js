import { MessageEmbed } from "discord.js";

export default {
    name: "serverinfo",
    usage: "n!serverinfo <...args>",
    description: 'Creates information embed for a game server',
    run(client, message, args) {
        let serverTitle = message.content.match(/-name "([^"]*)"/)
        let serverStatus = message.content.match(/-status "([^"]*)"/)
        let serverIP = message.content.match(/-ip "([^"]*)"/)
        let serverMCVersion = message.content.match(/-mcversion "([^"]*)"/)
        let serverMPVersion = message.content.match(/-mpversion "([^"]*)"/)
        let serverRules = message.content.match(/-rules "([^"]*)"/)
        let serverDownload = message.content.match(/-mpdownload "([^"]*)"/)
        let serverIssueTracker = message.content.match(/-issues "([^"]*)"/)
        let serverGuidance = message.content.match(/-guidance "([^"]*)"/)


        const addServerEmbed = new MessageEmbed()
            .setFooter('NEW!')
            .setTimestamp()
            .setColor(message.author.displayHexColor ?? '#FEFEFE')

        if (serverTitle) {
            addServerEmbed.setTitle(serverTitle?.[1].toString())
        }
        if (serverStatus) {
            addServerEmbed.addField('Status', serverStatus?.[1].toString(), true)
        }

        if (serverIP) {
            addServerEmbed.addField('IP', serverIP?.[1].toString(), true)
        }

        if (serverMCVersion) {
            addServerEmbed.addField('Minecraft Version', serverMCVersion?.[1].toString(), true)
        }

        if (serverMPVersion) {
            addServerEmbed.addField('Modpack Version', serverPVersion?.[1].toString(), true)
        }

        if (serverRules) {
            addServerEmbed.addField('Notes // Rules', serverRules?.[1].toString(), true)
        }

        if (serverDownload) {
            addServerEmbed.addField('Download', `[Click Here](${serverPackDownload?.[1].toString()})`, true)
        }

        if (serverIssueTracker) {
            addServerEmbed.addField('Issue Tracker', `[Click Here](${serverPackIssueTracker?.[1].toString()})`, true)
        }

        if (serverGuidance) {
            addServerEmbed.addField('Guidance', `[Click Here](${serverPackGuidance?.[1].toString()})`, true)
        }
        return message.channel.send(addServerEmbed)
    }
}