import { MessageEmbed } from "discord.js";

const allowedGuildIds = [
    { name: 'nightshade_alley', id: '466402083466379267' }
]

export default {
    name: 'pokedodie',
    usage: 'n!pokedodie',
    description: 'Sends loving DM to Triz\'s GF',
    permissions: '@botOwner',
    requiredArgs: '',
    hidden: true,
    run(client, message, args) {
        if (message.author.id !== client.config.botOwnerId) return;

        if (allowedGuildIds.map(g => g.id).indexOf(message.guild.id) < 0) return;

        message.delete({ timeout: 1000 })

        let target = message.guild.members.cache.get('419996490170105869');

        if (!target) return message.reply('No.').then(msg => msg.delete({ timeout: 5000 }))

        const embed = new MessageEmbed()
            .setTitle('Hi, Dodie!')
            .setColor(message.member.displayHexColor)
            .setThumbnail(target.user.displayAvatarURL())
            .setDescription('Triz says he loves you. You\'ll figure it out! <3')

        target.send(embed)
    }
}