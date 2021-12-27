import Event from '../Structures/Event.js'

export default new Event(
    'ready',
    async client => {
        client.log('Bot has connected!', 'warn')
        client.user.setActivity('my development!', { type: 'WATCHING' })
    }
)