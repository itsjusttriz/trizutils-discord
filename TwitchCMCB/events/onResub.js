import ChannelImports from '../DB/ChannelImports.js';
import { planToName } from '../utils/Functions.js';
import { HandlerManager } from '../utils/HandlerManager.js';

export default async function (chatClient, channel, user, subInfo, msg) {

    const options = {
        channel,
        user,
        subInfo,
        msg,
        planToName,
        logChan: 'nottriz',
        defResub: `coxHypers Returning ${planToName(subInfo.plan)} Resub: ${subInfo.displayName} coxHypers (${subInfo.months} months)`,
        logResub: `[${channel}] |RESUB| <${user}> GivePLZ ${planToName(subInfo.plan)} (${subInfo.months} months)`
    };

    if (HandlerManager.cache.resub[options.channel]) {
        switch (channel) {
            case '#almostfae':
                (await ChannelImports.ALMOSTFAE).handleResub(chatClient, options);
                break;
            case '#blitzyuk':
                (await ChannelImports.BLITZYUK).handleResub(chatClient, options);
                break;
            case '#dfearthereaper':
                (await ChannelImports.DFEARTHEREAPER).handleResub(chatClient, options);
                break;
            case '#domosplace':
                (await ChannelImports.DOMOSPLACE).handleResub(chatClient, options);
                break;
            case '#finncapp':
                (await ChannelImports.FINNCAPP).handleResub(chatClient, options);
                break;
            case '#gwinthor':
                (await ChannelImports.GWINTHOR).handleResub(chatClient, options);
                break;
            case '#immp':
                (await ChannelImports.IMMP).handleResub(chatClient, options);
                break;
            case '#intimae':
                (await ChannelImports.INTIMAE).handleResub(chatClient, options);
                break;
            case '#itsjusttriz':
                (await ChannelImports.ITSJUSTTRIZ).handleResub(chatClient, options);
                break;
            case '#ja_keeler':
                (await ChannelImports.JA_KEELER).handleResub(chatClient, options);
                break;
            case '#jayrockbird':
                (await ChannelImports.JAYROCKBIRD).handleResub(chatClient, options);
                break;
            case '#kikiisyourfriend':
                (await ChannelImports.KIKIISYOURFRIEND).handleResub(chatClient, options);
                break;
            case '#matrixis':
                (await ChannelImports.MATRIXIS).handleResub(chatClient, options);
                break;
            case '#queenliz09':
                (await ChannelImports.QUEENLIZ09).handleResub(chatClient, options);
                break;
            case '#reninsane':
                (await ChannelImports.RENINSANE).handleResub(chatClient, options);
                break;
            case '#rhilou32':
                (await ChannelImports.RHILOU32).handleResub(chatClient, options);
                break;
            case '#superfraggle':
                (await ChannelImports.SUPERFRAGGLE).handleResub(chatClient, options);
                break;
            case '#techyguy':
                (await ChannelImports.TECHYGUY).handleResub(chatClient, options);
                break;
            case '#theimperialbitgod':
                (await ChannelImports.THEIMPERIALBITGOD).handleResub(chatClient, options);
                break;
            case '#tonster46346':
                (await ChannelImports.TONSTER46346).handleResub(chatClient, options);
                break;
            case '#xobias':
                (await ChannelImports.XOBIAS).handleResub(chatClient, options);
                break;
        }
    }
}