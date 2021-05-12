export default {
    name: 'kill',
    usage: 'n!kill',
    run(chatClient, message, args, options) {
        if (!options.isBotAdmin) return;

        chatClient.say(options.logChan, options.logMsg);

        console.log(`${options.user} has killed me!`);

        process.exit(0);
    }
};