import * as fs from 'fs';

export const ChannelManager = {
    list: null,
    add(chatClient, options, chanName) {
        const index = this.list.indexOf(chanName);

        if (index < 0) {
            chatClient.say(options.channel, `${options.user}, attempting to join channel: '${chanName}'`);
            chatClient.join(chanName);
            this.list.push(chanName);
            return this.backup();
        }
        return chatClient.say(options.channel, `${options.user}, '${chanName}' is already stored to the DB.`);
    },
    remove(chatClient, options, chanName) {
        const index = this.list.indexOf(chanName);

        if (index > -1) {
            chatClient.say(options.channel, `${options.user}, attempting to leave channel: '${chanName}'`);
            chatClient.part(chanName);
            this.list.splice(index, 1);
            return this.backup();
        }
        return chatClient.say(options.channel, `${options.user}, '${chanName}' is not currently stored in the DB.`);
    },
    backup() {
        const path = './DB/JSON-Storage/storedChannels.json';

        fs.writeFile(path, JSON.stringify(this.list), (err) => {
            if (err) return console.error(err);
        });
    },
    restore(cb) {
        const path = './DB/JSON-Storage/storedChannels.json';

        fs.readFile(path, (err, data) => {
            if (err) return cb(err);
            this.list = JSON.parse(data);
            cb();
        });
    },
    import(chatClient) {
        this.restore(err => {
            if (err) return console.error(err);

            this.list.sort();

            this.list.forEach(c => {
                chatClient.join(c);
            });
        });
    }
};