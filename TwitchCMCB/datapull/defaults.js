// onMessage()
export function args(message) { return message.split(' '); }
export function command(message) { return args(message).shift().toLowerCase(); }
export function firstArg(message) { return args(message).slice(1)[0]; }
export function allArgs(message) { return args(message).slice(1).join(' '); }
export function isSubPlus(msg) { return msg.userInfo.isSubscriber || msg.userInfo.isFounder; }
export function isModPlus(msg) { return msg.userInfo.isMod || msg.userInfo.isBroadcaster; }
export function isCaster(msg) { return msg.userInfo.isBroadcaster; }
export function createMessageEventLogMessage(channel, user, message) { return `[${channel}] <${user}> ${command(message)} ${allArgs(message)}`; }
export function createDisabledCommandMessage(user) { return `@${user}, This command has been temporarily disabled.`; }
// onCheer()
export function createDefaultCheerMessage(msg) { return `coxHypers x${msg.totalBits}`; }
export function createCheerEventLogMessage(channel, user, msg) { return `[${channel}] |BITS| <${user}> GivePLZ ${msg.totalBits}`; }
// onSub()
export function createDefaultSubMessage(subInfo) { return `coxHypers New ${planToName(subInfo.plan)} Sub: ${subInfo.displayName} coxHypers`; }
export function createSubEventLogMessage(channel, subInfo) { return `[${channel}] |SUB| <${subInfo.displayName}> GivePLZ ${planToName(subInfo.plan)}`; }
// onResub()
export function createDefaultResubMessage(subInfo) { return `coxHypers Returning ${planToName(subInfo.plan)} Resub: ${subInfo.displayName} coxHypers`; }
export function createResubEventLogMessage(channel, user, subInfo) { return `[${channel}] |RESUB| <${user}> GivePLZ ${planToName(subInfo.plan)} (${subInfo.months} months)`; }
// onGiftSub()
export function createDefaultSubgiftMessage(subInfo) { return `coxHypers ${subInfo.gifterDisplayName} -> ${subInfo.displayName} (${planToName(subInfo.plan)})`; }
export function createSubgiftEventLogMessage(channel, user, subInfo) { return `[${channel}] |GIFTSUB| <${subInfo.gifter} -> ${user}> GivePLZ ${planToName(subInfo.plan)}`; }
// onRaid()
export function createDefaultRaidMessage(raidInfo) { return `Welcome Raiders from ${raidInfo.displayName}'s channel! <3 GivePLZ`; }
export function createRaidEventLogMessage(channel, raidInfo) { return `[${channel}] |RAID| <${raidInfo.displayName}> GivePLZ ${raidInfo.viewerCount} Viewers`; }
// Misc()
export const cmdPrefix = 'n!';
export const createNoSubApiAuth = 'Missing Authentication!! Please Authenticate here and try again - https://nottriz.weebly.com/twitch/subapi';
export function planToName(plan) { const planStrings = { "1000": "Tier 1", "2000": "Tier 2", "3000": "Tier 3", "Prime": "Prime" }; return planStrings[plan] ?? ""; }
export const logChannel = '#nottriz';
export function randNum(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }
// onCooldown()
export const cooldown = {}
export function isOnCooldown(channel, command = command(message)) { if (cooldown[channel] && cooldown[channel][command] == true) return true; else return false; }
export function setCooldown(channel, command = command(message), cd = 5) { if (!cooldown[channel]) cooldown[channel] = {}; cooldown[channel][command] = true; setTimeout(function unsetCooldown() { cooldown[channel][command] = false; }, cd * 1000); }