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
        defSub: `coxHypers New ${planToName(subInfo.plan)} Sub: ${subInfo.displayName} coxHypers`,
        logSub: `[${channel}] |SUB| <${subInfo.displayName}> GivePLZ ${planToName(subInfo.plan)}`
    };

    switch (channel) {
        case '#almostfae':
            (await ChannelImports.ALMOSTFAE).handleSub(chatClient, options);
            break;
        case '#blitzyuk':
            (await ChannelImports.BLITZYUK).handleSub(chatClient, options);
            break;
        case '#dfearthereaper':
            (await ChannelImports.DFEARTHEREAPER).handleSub(chatClient, options);
            break;
        case '#domosplace':
            (await ChannelImports.DOMOSPLACE).handleSub(chatClient, options);
            break;
        case '#finncapp':
            (await ChannelImports.FINNCAPP).handleSub(chatClient, options);
            break;
        case '#gwinthor':
            (await ChannelImports.GWINTHOR).handleSub(chatClient, options);
            break;
        case '#immp':
            (await ChannelImports.IMMP).handleSub(chatClient, options);
            break;
        case '#intimae':
            (await ChannelImports.INTIMAE).handleSub(chatClient, options);
            break;
        case '#itsjusttriz':
            (await ChannelImports.ITSJUSTTRIZ).handleSub(chatClient, options);
            break;
        case '#ja_keeler':
            (await ChannelImports.JA_KEELER).handleSub(chatClient, options);
            break;
        case '#jayrockbird':
            (await ChannelImports.JAYROCKBIRD).handleSub(chatClient, options);
            break;
        case '#kikiisyourfriend':
            (await ChannelImports.KIKIISYOURFRIEND).handleSub(chatClient, options);
            break;
        case '#matrixis':
            (await ChannelImports.MATRIXIS).handleSub(chatClient, options);
            break;
        case '#queenliz09':
            (await ChannelImports.QUEENLIZ09).handleSub(chatClient, options);
            break;
        case '#reninsane':
            (await ChannelImports.RENINSANE).handleSub(chatClient, options);
            break;
        case '#rhilou32':
            (await ChannelImports.RHILOU32).handleSub(chatClient, options);
            break;
        case '#superfraggle':
            (await ChannelImports.SUPERFRAGGLE).handleSub(chatClient, options);
            break;
        case '#techyguy':
            (await ChannelImports.TECHYGUY).handleSub(chatClient, options);
            break;
        case '#theimperialbitgod':
            (await ChannelImports.THEIMPERIALBITGOD).handleSub(chatClient, options);
            break;
        case '#tonster46346':
            (await ChannelImports.TONSTER46346).handleSub(chatClient, options);
            break;
        case '#xobias':
            (await ChannelImports.XOBIAS).handleSub(chatClient, options);
            break;
        // case '#zeroxfusionz':
        //     (await ChannelImports.ZEROXFUSIONZ).handleSub(chatClient, options)
        //     break;
    }
}