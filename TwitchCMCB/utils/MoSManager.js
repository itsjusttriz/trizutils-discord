import * as fs from 'fs';

export const MoSManager = {
    counts: null,
    add(channel) {
        this.counts.current[channel] += 1;
        this.backup();
    },
    remove(channel) {
        this.counts.current[channel] += -1;
        this.backup();
    },
    set(current, total, channel) {
        this.counts.current[channel] = !isNaN(current) ? current : 0;
        this.counts.total[channel] = !isNaN(total) ? total : 0;
        this.backup();
    },
    reset(channel) {
        this.counts.current[channel] = 0;
        this.counts.total[channel] = 0;
        this.backup();
    },
    backup() {
        const path = './DB/JSON-Storage/storedMos.json';

        fs.writeFile(path, JSON.stringify(this.counts), err => {
            if (err) return console.error(err);
        });
    },
    restore(cb) {
        const path = './DB/JSON-Storage/storedMos.json';

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