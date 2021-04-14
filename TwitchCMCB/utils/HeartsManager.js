import * as fs from 'fs';

export const HeartsManager = {
    heartString: null,
    add(options, heart) {
        const index = this.heartString.indexOf(heart);

        if (index < 0) {
            this.heartString.push(heart);
            this.backup();
            options.chatClient.say(options.channel, `Added heart: ${heart}`);
        } else {
            options.chatClient.say(options.channel, `DB already contains ${heart}`);
        }
    },
    remove(options, heart) {
        const index = this.heartString.indexOf(heart);

        if (index > -1) {
            this.heartString.splice(index, 1);
            this.backup();
            return options.chatClient.say(options.channel, `Removed heart: ${heart}`);
        } else {
            return options.chatClient.say(options.channel, `DB doesn't currently contain ${heart}`);
        }
    },
    clearCache(options) {
        this.heartString = ['<3'];
        this.backup();
        return options.chatClient.say(options.channel, 'Cleared the hearts cache!');
    },
    backup() {
        const path = './DB/JSON-Storage/storedHearts.json';

        fs.writeFile(path, JSON.stringify(this.heartString), err => {
            if (err) return console.error(err);
        });
    },
    restore(cb) {
        const path = './DB/JSON-Storage/storedHearts.json';

        fs.readFile(path, (err, data) => {
            if (err) return cb(err);
            this.heartString = JSON.parse(data);
            cb();
        });
    },
    import() {
        this.restore(err => {
            if (err) return console.error(err);
        });
    }
};