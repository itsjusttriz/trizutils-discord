import * as fs from 'fs';

export const CooldownManager = {
    cd: null,
    set(command, channel, value) {
        this.cd[command][channel] = value;
        this.backup();
    },
    get(command, channel) {
        return this.cd[command][channel];
    },
    clear(command, channel) {
        this.cd[command][channel] = false;
        this.backup();
    },
    backup() {
        const path = './DB/JSON-Storage/storedCooldowns.json';

        fs.writeFile(path, JSON.stringify(this.cd), err => {
            if (err) return console.error(err);
        });
    },
    restore(cb) {
        const path = './DB/JSON-Storage/storedCooldowns.json';

        fs.readFile(path, (err, data) => {
            if (err) return cb(err);
            this.cd = JSON.parse(data);
            cb();
        });
    },
    import() {
        this.restore(err => {
            if (err) return console.error(err);
        });
    }
};