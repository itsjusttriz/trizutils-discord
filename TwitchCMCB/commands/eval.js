export default {
    name: 'eval',
    usage: 'n!eval <query>',
    async run(chatClient, message, args, options) {
        if (options.user !== 'itsjusttriz') return;

        try {
            const result = await eval(args.join(' '));
            console.log('EVAL USED:', result);
        } catch (error) {
            console.error('Error evaluating', code, error);
        }
    }
}