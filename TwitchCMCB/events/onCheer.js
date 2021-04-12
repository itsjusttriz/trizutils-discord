import ChannelImports from '../DB/ChannelImports.js';

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
                (await ChannelImports.ALMOSTFAE).handleCheer(chatClient, options)
                break;
            case '#blitzyuk':
                (await ChannelImports.BLITZYUK).handleCheer(chatClient, options)
                break;
            case '#dfearthereaper':
                (await ChannelImports.DFEARTHEREAPER).handleCheer(chatClient, options)
                break;
            case '#domosplace':
                (await ChannelImports.DOMOSPLACE).handleCheer(chatClient, options)
                break;
            case '#finncapp':
                (await ChannelImports.FINNCAPP).handleCheer(chatClient, options)
                break;
            case '#gwinthor':
                (await ChannelImports.GWINTHOR).handleCheer(chatClient, options)
                break;
            case '#immp':
                (await ChannelImports.IMMP).handleCheer(chatClient, options)
                break;
            case '#intimae':
                (await ChannelImports.INTIMAE).handleCheer(chatClient, options)
                break;
            case '#itsjusttriz':
                (await ChannelImports.ITSJUSTTRIZ).handleCheer(chatClient, options)
                break;
            case '#ja_keeler':
                (await ChannelImports.JA_KEELER).handleCheer(chatClient, options)
                break;
            case '#jayrockbird':
                (await ChannelImports.JAYROCKBIRD).handleCheer(chatClient, options)
                break;
            case '#kikiisyourfriend':
                (await ChannelImports.KIKIISYOURFRIEND).handleCheer(chatClient, options)
                break;
            case '#matrixis':
                (await ChannelImports.MATRIXIS).handleCheer(chatClient, options)
                break;
            case '#queenliz09':
                (await ChannelImports.QUEENLIZ09).handleCheer(chatClient, options)
                break;
            case '#reninsane':
                (await ChannelImports.RENINSANE).handleCheer(chatClient, options)
                break;
            case '#rhilou32':
                (await ChannelImports.RHILOU32).handleCheer(chatClient, options)
                break;
            case '#superfraggle':
                (await ChannelImports.SUPERFRAGGLE).handleCheer(chatClient, options)
                break;
            case '#techyguy':
                (await ChannelImports.TECHYGUY).handleCheer(chatClient, options)
                break;
            case '#theimperialbitgod':
                (await ChannelImports.THEIMPERIALBITGOD).handleCheer(chatClient, options)
                break;
            case '#tonster46346':
                (await ChannelImports.TONSTER46346).handleCheer(chatClient, options)
                break;
            case '#xobias':
                (await ChannelImports.XOBIAS).handleCheer(chatClient, options)
                break;
            // case '#zeroxfusionz':
            //     (await ChannelImports.ZEROXFUSIONZ).handleCheer(chatClient, options)
            //     break;
        }
    }
}