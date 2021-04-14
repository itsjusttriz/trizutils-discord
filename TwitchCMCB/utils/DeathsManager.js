import * as fs from 'fs';

export const DeathsManager = {
    counts: null,
    tag: '[DeathCounter]',
    add(channel) {
        this.counts[channel] += 1;
        this.backup();
    },
    remove(channel) {
        this.counts[channel] += -1;
        this.backup();
    },
    set(channel, n) {
        this.counts[channel] = !isNaN(n) ? n : 0;
        this.backup();
    },
    reset(channel) {
        this.counts[channel] = 0;
        this.backup();
    },
    backup() {
        const path = './DB/JSON-Storage/storedDeaths.json';

        fs.writeFile(path, JSON.stringify(this.counts), err => {
            if (err) return console.error(err);
        });
    },
    restore(cb) {
        const path = './DB/JSON-Storage/storedDeaths.json';

        fs.readFile(path, (err, data) => {
            if (err) return cb(err);
            this.counts = JSON.parse(data);
            cb();
        });
    },
    import() {
        this.restore(err => {
            if (err) return console.error(err);
        });
    }
};