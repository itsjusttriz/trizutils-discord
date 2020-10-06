const twitchjs = require('twitch-js');
const client = new twitchjs.client({
	options: { debug: true },
	connection: { reconnect: true, secure: true },
	identity: { username: 'nottriz', password: 'oauth:upqjpfp74s9asyi36fe7yj7lryx2o9' },
	channels: ['#nottriz', '#itsjusttriz', '#rhilou32', '#dragoness_', '#lianne669', '#tarillthemad', '#asylum_orderly', '#zeta_the_dragon', '#superfraggle', '#immp', '#xobias', '#matrixis', '#reninsane', '#tellik', '#47y_', '#massbanbot']
});

const clientID = ['1vw4epe6wur0n3g7gyh9o0mrtkfy6g'];

module.exports.client = client;
module.exports.clientID = clientID;