const Twitch = {
    self: {
        getName: (env: NodeJS.ProcessEnv): string | undefined => { return env['TWITCH_USERNAME'] },
        getPassword: (env: NodeJS.ProcessEnv): string | undefined => { return env['TWITCH_BASE_OAUTH'] },
        getPrefix: (env: NodeJS.ProcessEnv): string => { return !env['TWITCH_DEV_MODE'] ? env['TWITCH_PREFIX']! : '..'; }
    },
    clientOpts: (env: NodeJS.ProcessEnv): any => {
        const obj = {
            connection: {
                reconnect: true,
                secure: true
            },
            channels: ['nottriz'],
            identity: {
                username: env['TWITCH_USERNAME'],
                password: env['TWITCH_BASE_OAUTH']
            },
            options: { messagesLogLevel: 'debug' }
        }
        return obj;
    },
    tagColor: '#b700ff',
    debug: false,
    botAdmin: ['itsjusttriz', 'nottriz', '47y_', 'tellik', 'rhilou32', 'immp']
};

// TODO: Add Content.
const Discord = {
    self: {
        getToken: (env: NodeJS.ProcessEnv): string => { return !env['DISCORD_DEV_MODE'] ? env['DISCORD_TOKEN']! : env['DISCORD_TEST_TOKEN']!; },
        getPrefix: (env: NodeJS.ProcessEnv): string => { return !env['DISCORD_DEV_MODE'] ? env['PREFIX']! : '..'; }
    },
    tagColor: '#4946ab',
    debug: true
}

//TODO: Add Content.
const Twitter = {}


export default {
    Twitch,
    Discord,
    Twitter
}