import chalk from 'chalk';
import ClientUtils from './ClientUtils.js'

const TwitchLogOptions = {
    LogSymbolColors: new Map([
        ['Vip', chalk.magenta.bold('[VIP]')],
        ['Sub', chalk.blue.bold('[Sub]')],
        ['Mod', chalk.green.bold('[Mod]')],
        ['Caster', chalk.red.bold('[Caster]')],
        ['Staff', chalk.yellow.bold('[Staff]')],
        ['BotAdmin', chalk.bgRed.white.bold('[BotAdmin]')]
    ]),
    GenericMessageLog: (options: any) => {

        const arr: any[] = [];

        //? Twitch Tag
        arr.push(chalk.hex(ClientUtils.Twitch.tagColor).bold('TWITCH'))

        //? System Seperator
        arr.push(chalk.grey('//'))

        //? Channel
        arr.push(chalk.hex('#ffa200')(`[${options['channel']}]`))

        //? Badges
        if (options?.isBotAdmin) arr.push(TwitchLogOptions.LogSymbolColors.get('BotAdmin'));
        if (options?.isCaster) arr.push(TwitchLogOptions.LogSymbolColors.get('Caster'));
        if (options?.isStaff) arr.push(TwitchLogOptions.LogSymbolColors.get('Staff'));
        if (options?.isMod) arr.push(TwitchLogOptions.LogSymbolColors.get('Mod'));
        if (options?.isSubOrFounder) arr.push(TwitchLogOptions.LogSymbolColors.get('Sub'));
        if (options?.isVip) arr.push(TwitchLogOptions.LogSymbolColors.get('Vip'));

        //? Display Name
        arr.push(chalk.hex(options?.['userstate'].color ? options?.['userstate'].color : '#DEADED')(`<${options?.['userstate']?.["display-name"]}>`))

        //? Event Seperator
        arr.push(chalk.grey('|'))

        //? Message
        arr.push(options?.message)

        return console.log(arr.join(' '));
    },
    GenericJoinLog: (user: string, string: string) => console.log(chalk.hex('#007313').bold(`[${chalk.hex(ClientUtils.Twitch.tagColor).bold('TWITCH')}] ${user} - ${string}`)),
    GenericPartLog: (user: string, string: string) => console.log(chalk.hex('#6b0501').bold(`[${chalk.hex(ClientUtils.Twitch.tagColor).bold('TWITCH')}] ${user} - ${string}`)),
    GenericCheerLog: (opts: any) => console.log(chalk.yellow.bold(`[${chalk.hex(ClientUtils.Twitch.tagColor).bold('TWITCH')}] ${opts.userstate['display-name']} cheered ${opts.userstate.bits} in ${opts.channel}!`))
};

const DiscordLogOptions = {
    LogSymbolColors: new Map([]),
    Log: (type: string, stringToLog: any) => {

        switch (type) {
            case 'debug':
                return console.log(stringToLog);
                break;
        }
    }
};

export default { TwitchLogOptions, DiscordLogOptions }