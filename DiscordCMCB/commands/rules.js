import { MessageEmbed } from "discord.js";

const idStorage = [
    {
        guildName: "cmcb_official",
        channelId: "768289505077100546",
        msgId: "772548727914102787"
    }
]

export default {
    name: 'rules',
    usage: 'rules',
    description: 'Edits rules embeds in various guilds',
    permissions: '@botOwner',
    requiredArgs: '',
    hidden: true,
    run(client, message, args) {

        // Delete triggering command.
        message.delete({ timeout: 1000 })

        if (message.author.id !== client.config.botOwnerId) return;

        if (args[0]) return;

        // If guild.id matches 'cmcb_official' guild.id, Do things..
        if (message.guild.id === client.guildIdList.get('cmcb_official')) {
            const embed = new MessageEmbed()
                .setAuthor('NotTriz CMCB Support')
                .setThumbnail(message.guild.iconURL())
                .setTitle('----- ⊱ Rules ⊰ -----')
                .setDescription('As this Discord Server is open as a Community Support Server, we ask that all members read and comply with the Discord Guidelines found [here](https://discordapp.com/guidelines).\n\nFailure to follow these guidelines will result in a ban from this server and you\'ll be added to the ignore list for future support queries.\n----------------------------------------------------------------------------------\n**GENERAL**\n----------------------------------------------------------------------------------')
                .addField('• Don\'t be a Dick!', 'Be nice, Be respectful, and act as you would in any public capacity.\nMalicious Behaviour, Racism, Sexism, Homophobia and any other form of hate will **NOT** be accepted!\n')
                .addField('• No Arguing!', 'This goes for both: Arguing against Staff & Arguing amongst eachother.\nIf you feel a debate or discussion getting heated, move it to DMs.\nOtherwise Staff will intervene.')
                .addField('• No NSFW (18+) content!', 'We ask that you refrain from posting "Obscene" or Overly-Explicit messages in this server.')
                .addField('• Use the correct channels!', 'This server has a required range of channels to suit everyone\'s current needs.\nIf a specific channel is requested, Staff will take it into consideration, for it to be added.\nMeanwhile, please keep **ALL** content to it\'s respective channel.')
                .addField('• No Advertising!', 'All forms of advertisement will be removed immediately.')
                .addField('• No Spam!', 'Flooding the chat with individual lines of any sort of content, is severely frowned upon.\n----------------------------------------------------------------------------------\n**NOTES**\n----------------------------------------------------------------------------------')
                .addField('#1', '• We use a 3-strike system in this server to disclipline users who do not abide by the rules.\nOnce a user has reached their 3rd strike, they\'ll be taken into consideration by the Staff Team for a permanent ban from this server.')
                .addField('#2', '• All Staff decisions are **FINAL**. Complaints etc. related to their decisions will contribute towards the 3rd strike discussion.')
                .setFooter('Last Updated')
                .setTimestamp()
                .setColor(message.guild.me.displayHexColor)
            client.channels.fetch(idStorage[0].channelId).then(channel => {
                channel.messages.fetch(idStorage[0].msgId).then(msg => {
                    msg.edit(embed)
                }).catch(console.error)
            }).catch(console.error)
        }
    }
}