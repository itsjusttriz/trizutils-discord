import { Activity, Guild } from "discord.js"

export const ReqString = {
    type: String,
    required: true
}

export const NotReqString = {
    type: String,
    required: false
}

export const findChannelByName = (guild: Guild, channel: string) =>
{
    return guild?.channels.cache.find(c => c.name === channel)
}

export const findRoleByName = (guild: Guild, role: string) =>
{
    return guild?.roles.cache.find(r => r.name === role)
}

export class StreamInfo
{
    readonly title: string
    readonly category: string
    readonly url: string
    readonly image: string

    constructor(data: Activity)
    {
        this.title = data.details || 'Unknown Title';
        this.category = data.state || 'Unknown Category';
        this.url = data.url || 'https://dev.triz.link/#/notfound';
        this.image = data.assets?.largeImageURL({ size: 4096 }) || 'https://blog.twitch.tv/assets/uploads/03-glitch.jpg';
    }
}