import * as fs from 'fs';

export const HandlerManager = {
    cache: {},
    path: './DB/JSON-Storage/storedHandlerStates.json',
    toggle(channel, event) {
        this.cache[event][channel] = !this.cache[event][channel];
        this.backup();
    },
    has(channel, event) {
        return Object.prototype.hasOwnProperty.call(this.cache[event], channel);
    },
    get(channel, event) {
        return this.cache[event][channel];
    },
    backup() {
        fs.writeFile(this.path, JSON.stringify(this.cache), err => {
            if (err) return console.error(err);
        });
    },
    restore(cb) {
        fs.readFile(this.path, (err, data) => {
            if (err) return cb(err);
            this.cache = JSON.parse(data);
            cb();
        });
    },
    import() {
        this.restore(err => {
            if (err) return console.error(err);
        });
    }
};