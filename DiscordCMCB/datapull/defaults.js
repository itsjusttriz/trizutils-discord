import * as config from '../config.js';

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const cooldown = {};
export function isOnCooldown(channel, command = command(message)) {
    if (cooldown[channel] && cooldown[channel][command] == true) return true;
    else return false;
}
export function setCooldown(channel, command = command(message), cd = 5) {
    if (!cooldown[channel]) cooldown[channel] = {};
    cooldown[channel][command] = true;
    setTimeout(function unsetCooldown() {
        cooldown[channel][command] = false;
    }, cd * 1000);
}
export function randomArrElement(arr) {
    return arr[Math.floor((Math.random() * arr.length))]
};
