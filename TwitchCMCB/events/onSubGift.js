import ChannelImports from '../DB/ChannelImports.js';
import { planToName } from '../utils/Functions.js';

export default async function (chatClient, channel, user, subInfo, msg) {

    const options = {
        channel,
        user,
        subInfo,
        msg,
        planToName,
        logChan: 'nottriz',
        defSubGift: `coxHypers ${subInfo.gifterDisplayName} -> ${subInfo.displayName} (${planToName(subInfo.plan)})`,
        logSubGift: `[${channel}] |GIFTSUB| <${subInfo.gifter} -> ${user}> GivePLZ ${planToName(subInfo.plan)}`
    }

    switch (channel) {
        case '#almostfae':
            (await ChannelImports.ALMOSTFAE).handleGiftSub(chatClient, options)
            break;
        case '#blitzyuk':
            (await ChannelImports.BLITZYUK).handleGiftSub(chatClient, options)
            break;
        case '#dfearthereaper':
            (await ChannelImports.DFEARTHEREAPER).handleGiftSub(chatClient, options)
            break;
        case '#domosplace':
            (await ChannelImports.DOMOSPLACE).handleGiftSub(chatClient, options)
            break;
        case '#finncapp':
            (await ChannelImports.FINNCAPP).handleGiftSub(chatClient, options)
            break;
        case '#gwinthor':
            (await ChannelImports.GWINTHOR).handleGiftSub(chatClient, options)
            break;
        case '#immp':
            (await ChannelImports.IMMP).handleGiftSub(chatClient, options)
            break;
        case '#intimae':
            (await ChannelImports.INTIMAE).handleGiftSub(chatClient, options)
            break;
        case '#itsjusttriz':
            (await ChannelImports.ITSJUSTTRIZ).handleGiftSub(chatClient, options)
            break;
        case '#ja_keeler':
            (await ChannelImports.JA_KEELER).handleGiftSub(chatClient, options)
            break;
        case '#jayrockbird':
            (await ChannelImports.JAYROCKBIRD).handleGiftSub(chatClient, options)
            break;
        case '#kikiisyourfriend':
            (await ChannelImports.KIKIISYOURFRIEND).handleGiftSub(chatClient, options)
            break;
        case '#matrixis':
            (await ChannelImports.MATRIXIS).handleGiftSub(chatClient, options)
            break;
        case '#queenliz09':
            (await ChannelImports.QUEENLIZ09).handleGiftSub(chatClient, options)
            break;
        case '#reninsane':
            (await ChannelImports.RENINSANE).handleGiftSub(chatClient, options)
            break;
        case '#rhilou32':
            (await ChannelImports.RHILOU32).handleGiftSub(chatClient, options)
            break;
        case '#superfraggle':
            (await ChannelImports.SUPERFRAGGLE).handleGiftSub(chatClient, options)
            break;
        case '#techyguy':
            (await ChannelImports.TECHYGUY).handleGiftSub(chatClient, options)
            break;
        case '#theimperialbitgod':
            (await ChannelImports.THEIMPERIALBITGOD).handleGiftSub(chatClient, options)
            break;
        case '#tonster46346':
            (await ChannelImports.TONSTER46346).handleGiftSub(chatClient, options)
            break;
        case '#xobias':
            (await ChannelImports.XOBIAS).handleGiftSub(chatClient, options)
            break;
        case '#zeroxfusionz':
            (await ChannelImports.ZEROXFUSIONZ).handleGiftSub(chatClient, options)
            break;
    }
}