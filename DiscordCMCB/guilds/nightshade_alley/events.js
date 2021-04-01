import { MessageEmbed } from "discord.js";

const guildChannelMap = new Map([
	['mainLogChannel', '509833053171089428'],
	['roleLogChannel', '763918843021492265'],
	['joinLogChannel', '482301995408162817'],
	['publicLiveChannel', '509828822200352810']
])

const guildLiveStatusMap = new Map();

async function testPresence(client, oldPresence, newPresence) {
	let channel = oldPresence.guild.channels.cache.get(guildChannelMap.get('mainLogChannel'));

	if (newPresence.user.id !== '228167686293553164') return;
}

async function isStreaming(client, oldPresence, newPresence) {
	let channel = oldPresence.guild.channels.cache.get(guildChannelMap.get('publicLiveChannel'));

	if (oldPresence.activities.length >= 1 && newPresence.activities.length >= 1) {

		const oldActivity = oldPresence.activities[0];
		const newActivity = newPresence.activities[0];
		const wasLive = oldActivity.name === 'Twitch' && oldActivity.type === 'STREAMING';
		const isLive = newActivity.name === 'Twitch' && newActivity.type === 'STREAMING';

		if (wasLive == isLive || isLive == wasLive) return;

		if (isLive) {

			let liveEmbed = new MessageEmbed()
				.setTitle('<:TwitchSymbol:809538716933816321> Twitch Live Stream Notification :bell:')
				.setColor(newPresence.member.displayHexColor || '#FEFEFE')
				.addField('Member', newPresence.member)
				.addField('Channel', newActivity.url.replace('https://www.twitch.tv/', ''))
				.addField('Stream Title', newActivity.details)
				.addField('Stream Game', newActivity.state, true)
				.addField('Link', `[Click to watch](${newActivity.url})`)
				.setThumbnail(newPresence.user.displayAvatarURL({ size: 512 }))
				.setTimestamp()

			return channel.send(liveEmbed).then(m => guildLiveStatusMap.set(newPresence.user.id, m.id));
		}

		if (!isLive) {

			if (!guildLiveStatusMap.has(newPresence.user.id)) return;

			const msgObject = await channel.messages.fetch(guildLiveStatusMap.get(newPresence.user.id));

			let offlineEmbed = new MessageEmbed()
				.setTitle(':x: Channel Offline :x:')
				.setColor(client.colorWheel.get('RED'))
				.addField('Member', newPresence.member)
				.addField('Channel', msgObject.embeds[0].fields[1].value)
				.addField('Follow Them Here', `[Link](${msgObject.embeds[0].fields[4].value.match(/\((.*?)\)/i)[1]})`)
				.setThumbnail(newPresence.user.displayAvatarURL({ size: 512 }))

			return msgObject.edit(offlineEmbed).then(() => guildLiveStatusMap.delete(newPresence.user.id));
		}

	}
}

async function roleUpdates(client, oldMember, newMember) {

	let channel = newMember.guild.channels.cache.get(guildChannelMap.get('roleLogChannel'))
	// If the role(s) are present on the old member object but no longer on the new one (i.e role(s) were removed)

	const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));

	if (removedRoles.size > 0) {
		// console.log(`The roles ${removedRoles.map(r => r.name)} were removed from ${oldMember.displayName} in ${oldMember.guild.name}.`);
		let embed1 = new MessageEmbed()
			.setAuthor(`${oldMember.user.tag}`, oldMember.user.displayAvatarURL())
			.addField(`${client.systemEmojis.get('BACKEND_MINUS')} Removed Role`, `${removedRoles.map(r => r.name)}`)
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
			.addField(`${client.systemEmojis.get('BACKEND_PLUS')} Added Role`, `${addedRoles.map(r => r.name)}`)
			.setFooter(`UserID: ${oldMember.id}`)
			.setColor(client.colorWheel.get('GREEN'))
			.setTimestamp()

		return channel.send(embed2)
	}
}

/*

	ACTUAL EVENT HANDLERS

*/

export async function handleGuildMemberUpdate(client, oldMember, newMember) {

	roleUpdates(client, oldMember, newMember);
}

export async function handlePresenceUpdate(client, oldPresence, newPresence) {

	testPresence(client, oldPresence, newPresence);
	isStreaming(client, oldPresence, newPresence);
}

export async function handleGuildMemberAdd(client, member) {
	let embed = new MessageEmbed()
		.setColor(client.colorWheel.get('GREEN'))
		.addField('Action', `${client.systeEmojis.get('BACKEND_JOIN')} Member Joined`, false)
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
		.addField('Action', `${client.systeEmojis.get('BACKEND_LEAVE')} Member Left`, false)
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

