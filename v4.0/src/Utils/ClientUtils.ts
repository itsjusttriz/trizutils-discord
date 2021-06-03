const Twitch = {
    self: {
        getName: () => { return Twitch.ClientOptions.identity.username },
        getPassword: () => { return Twitch.ClientOptions.identity.password }
    },
    ClientOptions: {
        channels: ['nottriz'],
        connection: { reconnect: true, secure: true },
        identity: {
            username: process.env.TWITCH_USERNAME,
            password: process.env.TWITCH_BASE_OAUTH
        },
        options: {
            messagesLogLevel: 'debug'
        }
    },
    tagColor: '#b700ff'
};

// TODO: Add Content.
const Discord = {
    self: {}
}

//TODO: Add Content.
const Twitter = {}

export default {
    Twitch,
    Discord,
    Twitter
}