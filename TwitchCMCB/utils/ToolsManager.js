import * as fs from 'fs';

export const ToolsManager = {
    counts: null,
    tag: '[ToolCounter]',
    add(tool, channel) {
        this.counts[tool][channel] += 1;
        this.backup();
    },
    remove(tool, channel) {
        this.counts[tool][channel] += -1;
        this.backup();
    },
    set(tool, channel, n) {
        this.counts[tool][channel] = !isNaN(n) ? n : 0;
        this.backup();
    },
    reset(tool, channel) {
        this.counts[tool][channel] = 0;
        this.backup();
    },
    backup() {
        const path = './DB/JSON-Storage/storedTools.json';

        fs.writeFile(path, JSON.stringify(this.counts), err => {
            if (err) return console.error(err);
        });
    },
    restore(cb) {
        const path = './DB/JSON-Storage/storedTools.json';

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