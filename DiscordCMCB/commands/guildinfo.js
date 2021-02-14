import * as Discord from "discord.js";
// import * as TimeFormat from 'hh-mm-ss'

export default {
    name: "guildinfo",
    usage: "n!guildinfo",
    description: 'Shows necessary Guild Info',
    run(client, message, args) {
        let permArr = [message.guild.ownerID, client.config.botOwnerId];
        if (permArr.indexOf(message.author.id) < 0) return;

        message.delete({ timeout: 1000 });

        const embed = new Discord.MessageEmbed()
            .setTitle(message.guild.name)
            .setFooter('Server Information')
            .setTimestamp()
            .setThumbnail(message.guild.iconURL())
            .setColor(message.member.displayHexColor)
            .addField("Owner", message.guild.owner.user.tag)
            .addField("Members", message.guild.memberCount)
            .addField("Region", message.guild.region)
            .addField('AFK Timeout', `${message.guild.afkTimeout / 60} minutes`)
        // .addField("AFK Timeout", `${TimeFormat.fromS(message.guild.afkTimeout) ?? '0'} minutes`)
        return message.channel.send(embed)
    }
}