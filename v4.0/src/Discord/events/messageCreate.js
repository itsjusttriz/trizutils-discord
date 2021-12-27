import Event from '../Structures/Event.js';
const { PREFIX } = process.env

export default new Event(
    'messageCreate',
    async (client, message) => {
        if (!message.content.startsWith(PREFIX)) return;

        const args = message.content.substr(PREFIX.length).split(/ +/);

        const command = client.commands.find(cmd => cmd.name === args[0]);
        if (!command) return message.reply({ content: `Invalid Command: ${args[0]}` });

        command.run(message, args, client);
    }
)