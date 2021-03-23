import * as fs from 'fs';

export const TwitchTokenManager = {
    cache: null,
    import() {
        fs.readFile('./DB/JSON/twitch-tokens.json', (err, data) => {
            if (err) return console.error(err);

            try {
                this.cache = JSON.parse(data);
            } catch (error) {
                console.error(error);
            }
        })
    },
    interval(seconds) {
        setInterval(() => {
            this.import();
        }, 1000 * seconds);
    }
}