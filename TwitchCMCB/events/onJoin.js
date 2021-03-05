import chalk from 'chalk';

export default function (chatClient, channel, user) {
    if (user === 'nottriz') {
        console.log(chalk.green(`===> Joined ${channel} <===`));
        chatClient.action('nottriz', `TESTING joined ${channel}`);
    }
}