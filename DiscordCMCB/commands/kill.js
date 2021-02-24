import chalk from 'chalk';

export default {
    name: "kill",
    usage: "n!kill",
    description: 'Manually kills the bot',
    permissions: '@botOwner',
    hidden: true,
    run(client, message, args) {
        message.delete({ timeout: 1000 })

        if (message.author.id !== client.config.botOwnerId) return;

        console.log(chalk.magenta.bold(`[SYSTEM] ${chalk.red.bold(`Manually killed by ${chalk.cyan.bold(message.author.tag)}`)}`))

        setTimeout(() => {
            process.exit(0);
        }, 5000)
    }
}