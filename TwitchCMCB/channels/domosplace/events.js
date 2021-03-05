export async function handleCheer(chatClient, options) {

    // Default Cheer Response.
    chatClient.say(options.channel, options.defCheer);

    // Log Cheer Event.
    chatClient.say(options.logChan, options.logCheer);

}

export async function handleSub(chatClient, options) {

    // Default Sub Response.
    chatClient.say(options.channel, options.defSub);

    // Log Sub Event.
    chatClient.say(options.logChan, options.logSub);

}

export async function handleResub(chatClient, options) {

    // Default Resub Response.
    chatClient.say(options.channel, options.defResub);

    // Log Resub Event.
    chatClient.say(options.logChan, options.logResub);

}

export async function handleGiftSub(chatClient, options) {

    // Default SubGift Response.
    chatClient.say(options.channel, options.defSubGift);

    // Log SubGift Event.
    chatClient.say(options.logChan, options.logSubGift);

}

export async function handleRaid(chatClient, options) {

    // Default Raid Response.
    chatClient.say(options.channel, options.defRaid);

    // Custom response addition.
    chatClient.say(options.channel, `!so ${options.user}`);

    // Log Raid Event.
    chatClient.say(options.logChan, options.logRaid);

}
