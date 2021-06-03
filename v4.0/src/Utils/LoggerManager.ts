import chalk from 'chalk';
import ClientUtils from './ClientUtils.js'

const TwitchChatOptions = {
    LogSymbolColors: new Map([
        ['Sub', chalk.blue.bold(' Sub ')],
        ['Mod', chalk.green.bold(' Mod ')],
        ['Caster', chalk.red.bold(' Caster ')],
        ['Staff', chalk.yellow.bold(' Staff ')]
    ]),
    Log: (options: any) => {
        // console.log(options);

        const arr: any[] = [];

        //? Twitch Tag
        arr.push(chalk.hex(ClientUtils.Twitch.tagColor).bold('TWITCH'))

        //? System Seperator
        arr.push(chalk.grey('//'))

        //? Channel
        arr.push(chalk.hex('#ffa200')(`[${options['channel']}]`))

        //? Badges
        if (options?.isCaster) arr.push(TwitchChatOptions.LogSymbolColors.get('Caster'));
        if (options?.isStaff) arr.push(TwitchChatOptions.LogSymbolColors.get('Staff'));
        if (options?.isMod) arr.push(TwitchChatOptions.LogSymbolColors.get('Mod'));
        if (options?.isSubOrFounder) arr.push(TwitchChatOptions.LogSymbolColors.get('Sub'));

        //? Display Name
        arr.push(chalk.hex(options?.['userstate'].color ? options?.['userstate'].color : '#DEADED')(`<${options?.['userstate']?.["display-name"]}>`))

        //? Event Seperator
        arr.push(chalk.grey('|'))

        //? Message
        arr.push(options?.message)

        return console.log(arr.join(' '));
    }
}

export default { TwitchChatOptions }