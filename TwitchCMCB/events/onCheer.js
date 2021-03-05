import channelImports from '../DB/channelImports.js';

export default async function (chatClient, channel, user, message, msg) {

    const options = {
        chatClient: chatClient,
        channel: channel,
        user: user,
        msg: msg,
        logChan: 'nottriz',
        defCheer: `coxHypers x${msg.totalBits}`,
        logCheer: `[${channel}] |BITS| <${user}> GivePLZ ${msg.totalBits}`
    }

    if (msg.isCheer) {
        switch (channel) {
            case '#almostfae':
                (await channelImports.ALMOSTFAE).handleCheer(chatClient, options)
                break;
            case '#blitzyuk':
                (await channelImports.BLITZYUK).handleCheer(chatClient, options)
                break;
            case '#dfearthereaper':
                (await channelImports.DFEARTHEREAPER).handleCheer(chatClient, options)
                break;
            case '#domosplace':
                (await channelImports.DOMOSPLACE).handleCheer(chatClient, options)
                break;
            case '#finncapp':
                (await channelImports.FINNCAPP).handleCheer(chatClient, options)
                break;
            case '#gwinthor':
                (await channelImports.GWINTHOR).handleCheer(chatClient, options)
                break;
            case '#immp':
                (await channelImports.IMMP).handleCheer(chatClient, options)
                break;
            case '#intimae':
                (await channelImports.INTIMAE).handleCheer(chatClient, options)
                break;
            case '#itsjusttriz':
                (await channelImports.ITSJUSTTRIZ).handleCheer(chatClient, options)
                break;
            case '#ja_keeler':
                (await channelImports.JA_KEELER).handleCheer(chatClient, options)
                break;
            case '#jayrockbird':
                (await channelImports.JAYROCKBIRD).handleCheer(chatClient, options)
                break;
            case '#kikiisyourfriend':
                (await channelImports.KIKIISYOURFRIEND).handleCheer(chatClient, options)
                break;
            case '#matrixis':
                (await channelImports.MATRIXIS).handleCheer(chatClient, options)
                break;
            case '#queenliz09':
                (await channelImports.QUEENLIZ09).handleCheer(chatClient, options)
                break;
            case '#reninsane':
                (await channelImports.RENINSANE).handleCheer(chatClient, options)
                break;
            case '#rhilou32':
                (await channelImports.RHILOU32).handleCheer(chatClient, options)
                break;
            case '#superfraggle':
                (await channelImports.SUPERFRAGGLE).handleCheer(chatClient, options)
                break;
            case '#techyguy':
                (await channelImports.TECHYGUY).handleCheer(chatClient, options)
                break;
            case '#theimperialbitgod':
                (await channelImports.THEIMPERIALBITGOD).handleCheer(chatClient, options)
                break;
            case '#tonster46346':
                (await channelImports.TONSTER46346).handleCheer(chatClient, options)
                break;
            case '#xobias':
                (await channelImports.XOBIAS).handleCheer(chatClient, options)
                break;
            case '#zeroxfusionz':
                (await channelImports.ZEROXFUSIONZ).handleCheer(chatClient, options)
                break;
        }
    }
}