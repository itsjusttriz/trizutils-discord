import ChannelImports from '../DB/ChannelImports.js';
import { HandlerManager } from '../utils/HandlerManager.js';

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
    };

    if (HandlerManager.cache.raid[options.channel]) {
        switch (channel) {
            case '#almostfae':
                (await ChannelImports.ALMOSTFAE).handleRaid(chatClient, options);
                break;
            case '#blitzyuk':
                (await ChannelImports.BLITZYUK).handleRaid(chatClient, options);
                break;
            case '#dfearthereaper':
                (await ChannelImports.DFEARTHEREAPER).handleRaid(chatClient, options);
                break;
            case '#domosplace':
                (await ChannelImports.DOMOSPLACE).handleRaid(chatClient, options);
                break;
            case '#finncapp':
                (await ChannelImports.FINNCAPP).handleRaid(chatClient, options);
                break;
            case '#gwinthor':
                (await ChannelImports.GWINTHOR).handleRaid(chatClient, options);
                break;
            case '#immp':
                (await ChannelImports.IMMP).handleRaid(chatClient, options);
                break;
            case '#intimae':
                (await ChannelImports.INTIMAE).handleRaid(chatClient, options);
                break;
            case '#itsjusttriz':
                (await ChannelImports.ITSJUSTTRIZ).handleRaid(chatClient, options);
                break;
            case '#ja_keeler':
                (await ChannelImports.JA_KEELER).handleRaid(chatClient, options);
                break;
            case '#jayrockbird':
                (await ChannelImports.JAYROCKBIRD).handleRaid(chatClient, options);
                break;
            case '#kikiisyourfriend':
                (await ChannelImports.KIKIISYOURFRIEND).handleRaid(chatClient, options);
                break;
            case '#matrixis':
                (await ChannelImports.MATRIXIS).handleRaid(chatClient, options);
                break;
            case '#queenliz09':
                (await ChannelImports.QUEENLIZ09).handleRaid(chatClient, options);
                break;
            case '#reninsane':
                (await ChannelImports.RENINSANE).handleRaid(chatClient, options);
                break;
            case '#rhilou32':
                (await ChannelImports.RHILOU32).handleRaid(chatClient, options);
                break;
            case '#superfraggle':
                (await ChannelImports.SUPERFRAGGLE).handleRaid(chatClient, options);
                break;
            case '#techyguy':
                (await ChannelImports.TECHYGUY).handleRaid(chatClient, options);
                break;
            case '#theimperialbitgod':
                (await ChannelImports.THEIMPERIALBITGOD).handleRaid(chatClient, options);
                break;
            case '#tonster46346':
                (await ChannelImports.TONSTER46346).handleRaid(chatClient, options);
                break;
            case '#xobias':
                (await ChannelImports.XOBIAS).handleRaid(chatClient, options);
                break;
        }
    }
}