import chalk from 'chalk';
import { ChannelManager } from '../utils/ChannelManager.js';
import { DeathsManager } from '../utils/DeathsManager.js';
import { MoSManager } from "../utils/MoSManager.js";
import { ToolsManager } from "../utils/ToolsManager.js";
import { CooldownManager } from '../utils/CooldownManager.js';

export default async function (chatClient, apiClient) {
    console.log(chalk.cyan.bold(`===> ${chalk.green.bold('READY!')} <===`))

    ChannelManager.import(chatClient);
    DeathsManager.import();
    MoSManager.import();
    ToolsManager.import();
    CooldownManager.import();

    const streamInfo = await apiClient.helix.streams.getStreamByUserName('itsjusttriz');

    setInterval(async () => {
        if (streamInfo) {
            console.log('');
        }
    }, 1000 * 60 * 1);
}