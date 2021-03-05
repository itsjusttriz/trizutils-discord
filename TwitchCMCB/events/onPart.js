import chalk from 'chalk';

export default async function onPart(chatClient, channel, user) {
    if (user === 'nottriz') {
        console.log(chalk.red(`===> Left ${channel} <===`));
        chatClient.action('#nottriz', `left ${channel}`);
    }
}