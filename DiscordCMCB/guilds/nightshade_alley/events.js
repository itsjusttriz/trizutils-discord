import { MessageEmbed } from "discord.js";

const guildChannelMap = new Map([
	['mainLogChannel', '509833053171089428'],
	['roleLogChannel', '763918843021492265'],
	['joinLogChannel', '482301995408162817']
])

export async function handleGuildMemberUpdate(client, oldMember, newMember) {
	let channel = newMember.guild.channels.cache.get(guildChannelMap.get('roleLogChannel'))
	// If the role(s) are present on the old member object but no longer on the new one (i.e role(s) were removed)

	const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));

	if (removedRoles.size > 0) {
		// console.log(`The roles ${removedRoles.map(r => r.name)} were removed from ${oldMember.displayName} in ${oldMember.guild.name}.`);
		let embed1 = new MessageEmbed()
			.setAuthor(`${oldMember.user.tag}`, oldMember.user.displayAvatarURL())
			.addField("<:backEndMinus:809616743332708372> Removed Role", `${removedRoles.map(r => r.name)}`)
			.setFooter(`UserID: ${oldMember.id}`)
			.setColor(client.colorWheel.get('RED'))
			.setTimestamp()

		return channel.send(embed1)
	}

	// If the role(s) are present on the new member object but are not on the old one (i.e role(s) were added)
	const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));

	if (addedRoles.size > 0) {
		// console.log(`The roles ${addedRoles.map(r => r.name)} were added to ${oldMember.displayName} in ${oldMember.guild.name}.`);
		let embed2 = new MessageEmbed()
			.setAuthor(`${oldMember.user.tag}`, oldMember.user.displayAvatarURL())
			.addField("<:backEndPlus:809616743659995146> Added Role", `${addedRoles.map(r => r.name)}`)
			.setFooter(`UserID: ${oldMember.id}`)
			.setColor(client.colorWheel.get('GREEN'))
			.setTimestamp()

		return channel.send(embed2)
	}
}

export async function handleGuildMemberAdd(client, member) {
	let embed = new MessageEmbed()
		.setColor(client.colorWheel.get('GREEN'))
		.addField('Action', '<:joinServer:770829534793826314> Member Joined', false)
		.addField('Username', member.user.username, true)
		.addField('ID', member.user.id, false)
		.addField('Bot?', member.user.bot, true)
		.addField('Discriminator', member.user.discriminator, true)
		.setThumbnail(member.user.displayAvatarURL())
		.setTimestamp()
	await client.channels.fetch(guildChannelMap.get('joinLogChannel')).then(channel => {
		return channel.send(embed)
	})
}

export async function handleGuildMemberRemove(client, member) {
	let embed = new MessageEmbed()
		.setColor(client.colorWheel.get('RED'))
		.addField('Action', '<:leaveServer:770829554059182090> Member Left', false)
		.addField('Username', member.user.username, true)
		.addField('ID', member.user.id, false)
		.addField('Bot?', member.user.bot, true)
		.addField('Discriminator', member.user.discriminator, true)
		.setThumbnail(member.user.displayAvatarURL())
		.setTimestamp()
	await client.channels.fetch(guildChannelMap.get('joinLogChannel')).then(channel => {
		return channel.send(embed)
	})
}

