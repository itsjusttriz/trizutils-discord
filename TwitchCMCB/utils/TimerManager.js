import * as fs from 'fs';

export const TimerManager = {
    statuses: null,
    path: './DB/JSON-Storage/storedTimerStatuses.json',
    enable(channel, timer) {
        this.statuses[channel][timer] = true;
        this.backup();
    },
    disable(channel, timer) {
        this.statuses[channel][timer] = false;
        this.backup();
    },
    get(channel, timer) {
        return this.statuses[channel][timer];
    },
    backup() {
        fs.writeFile(this.path, JSON.stringify(this.statuses), err => {
            if (err) return console.error(err);
        });
    },
    restore(cb) {
        fs.readFile(this.path, (err, data) => {
            if (err) return cb(err);
            this.statuses = JSON.parse(data);
            cb();
        });
    },
    import() {
        this.restore(err => {
            if (err) return console.error(err);
        });
    }
}

export const TimerRunner = {
    "#domosplace": {
        "90sCommercial": async (chatClient, apiClient) => {
            const isLive = await apiClient.helix.streams.getStreamByUserName('domosplace');

            setInterval(() => {
                if (TimerManager.get('#domosplace', '90sCommercial') == false) return;
                if (!isLive) return;

                chatClient.say('domosplace', '/me Running a 90 second ad..');
                chatClient.say('domosplace', '/commercial 90');
                chatClient.say('domosplace', 'Sick of the ads? Subscribe to Domo to get Ad-Free viewing experience while also showing off those really cool emotes! https://twitch.tv/domosplace/subscribe');
            }, 1000 * 60 * 30);
        }
    },
    "#finncapp": {
        "roxSellout": async (chatClient, apiClient) => {
            const isLive = await apiClient.helix.streams.getStreamByUserName('finncapp');

            setInterval(() => {
                if (TimerManager.get('#finncapp', 'roxSellout') == false) return;
                if (!isLive) return;

                chatClient.say('finncapp', 'ROX! GET YOUR ROX HERE!');
                chatClient.say('finncapp', '!rox');
                setTimeout(() => {
                    if (!isLive) return;

                    chatClient.say('finncapp', 'Wanna make Finn open some RoxBoxes on stream? SUBSCRIBE! And then go to - https://www.rox.gg/users/FinnCapp/roxbox/finncapp-finncapps-rox-box/freeclaim');
                    chatClient.say('finncapp', '!rox');
                }, 1000 * 60 * 15);
            }, 1000 * 60 * 30);
        }
    },
    "#nottriz": {
        "testing": async (chatClient, apiClient) => {
            const isLive = await apiClient.helix.streams.getStreamByUserName('finncapp');

            setInterval(() => {
                if (TimerManager.get('#nottriz', 'testing') == false) return;
                if (!isLive) return console.log('notlive');

                chatClient.say('nottriz', 'This works?!')
            }, 1000 * 5);
        }
    }
}