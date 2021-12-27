import Command from "../Structures/Command.js";

export default new Command({
    name: 'ping',
    description: 'Returns Client ping.',

    async run(message, args, client) {

        const msg = await message.reply({ content: `Client Ping: ${client.ws.ping} ms.` });

        return msg.edit(`Client Ping: ${client.ws.ping} ms.\nMessage Ping: ${msg.createdTimestamp - message.createdTimestamp} ms.`)
    }
})