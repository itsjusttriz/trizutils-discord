export default {
    name: "Ping",
    description: 'Checks latency of the bot',
    run(client, message, args) {
        message.channel.send('Pong!').catch(console.error)
    }
}