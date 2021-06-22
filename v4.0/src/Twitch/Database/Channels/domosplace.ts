async function cheer(options: any) {
    return options.TMIClient.say(options.channel, options.defaultResponse);
}

export default {
    cheer
}