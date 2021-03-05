import channelImports from '../DB/channelImports.js';

export default async function (chatClient, channel, user, raidInfo, msg) {

    const options = {
        chatClient,
        channel,
        user,
        raidInfo,
        msg,
        logChan: 'nottriz',
        defRaid: `Welcome Raiders from ${raidInfo.displayName}'s channel! <3 GivePLZ`,
        logRaid: `[${channel}] |RAID| <${raidInfo.displayName}> GivePLZ ${raidInfo.viewerCount} Viewers`
    }

    switch (channel) {
        case '#almostfae':
            (await channelImports.ALMOSTFAE).handleRaid(chatClient, options)
            break;
        case '#blitzyuk':
            (await channelImports.BLITZYUK).handleRaid(chatClient, options)
            break;
        case '#dfearthereaper':
            (await channelImports.DFEARTHEREAPER).handleRaid(chatClient, options)
            break;
        case '#domosplace':
            (await channelImports.DOMOSPLACE).handleRaid(chatClient, options)
            break;
        case '#finncapp':
            (await channelImports.FINNCAPP).handleRaid(chatClient, options)
            break;
        case '#gwinthor':
            (await channelImports.GWINTHOR).handleRaid(chatClient, options)
            break;
        case '#immp':
            (await channelImports.IMMP).handleRaid(chatClient, options)
            break;
        case '#intimae':
            (await channelImports.INTIMAE).handleRaid(chatClient, options)
            break;
        case '#itsjusttriz':
            (await channelImports.ITSJUSTTRIZ).handleRaid(chatClient, options)
            break;
        case '#ja_keeler':
            (await channelImports.JA_KEELER).handleRaid(chatClient, options)
            break;
        case '#jayrockbird':
            (await channelImports.JAYROCKBIRD).handleRaid(chatClient, options)
            break;
        case '#kikiisyourfriend':
            (await channelImports.KIKIISYOURFRIEND).handleRaid(chatClient, options)
            break;
        case '#matrixis':
            (await channelImports.MATRIXIS).handleRaid(chatClient, options)
            break;
        case '#queenliz09':
            (await channelImports.QUEENLIZ09).handleRaid(chatClient, options)
            break;
        case '#reninsane':
            (await channelImports.RENINSANE).handleRaid(chatClient, options)
            break;
        case '#rhilou32':
            (await channelImports.RHILOU32).handleRaid(chatClient, options)
            break;
        case '#superfraggle':
            (await channelImports.SUPERFRAGGLE).handleRaid(chatClient, options)
            break;
        case '#techyguy':
            (await channelImports.TECHYGUY).handleRaid(chatClient, options)
            break;
        case '#theimperialbitgod':
            (await channelImports.THEIMPERIALBITGOD).handleRaid(chatClient, options)
            break;
        case '#tonster46346':
            (await channelImports.TONSTER46346).handleRaid(chatClient, options)
            break;
        case '#xobias':
            (await channelImports.XOBIAS).handleRaid(chatClient, options)
            break;
        case '#zeroxfusionz':
            (await channelImports.ZEROXFUSIONZ).handleRaid(chatClient, options)
            break;
    }
}