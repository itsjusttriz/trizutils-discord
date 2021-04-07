import * as fs from 'fs';

const getStream = async (api, username) => {
    const state = await api.helix.streams.getStreamByUserName(username);

    if (!state) return false;
    return true;
}

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
        if (this.statuses[channel]?.[timer] === true) return true;

        return false;
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
            const caster = 'domosplace';

            setInterval(async () => {
                if (!TimerManager.get('#domosplace', '90sCommercial')) return;
                if (!(await getStream(apiClient, caster))) return;

                chatClient.say('domosplace', '/me Running a 90 second ad..');
                chatClient.say('domosplace', '/commercial 90');
                chatClient.say('domosplace', 'Sick of the ads? Subscribe to Domo to get Ad-Free viewing experience while also showing off those really cool emotes! https://twitch.tv/domosplace/subscribe');
            }, 1000 * 60 * 30);
        }
    },
    "#finncapp": {
        "roxSellout": async (chatClient, apiClient) => {
            const caster = 'finncapp';

            setInterval(async () => {
                if (!TimerManager.get('#finncapp', 'roxSellout')) return;
                if (!(await getStream(apiClient, caster))) return;

                chatClient.say('finncapp', 'ROX! GET YOUR ROX HERE!');
                chatClient.say('finncapp', '!rox');
                setTimeout(async () => {
                    if (!TimerManager.get('#finncapp', 'roxSellout')) return;
                    if (!(await getStream(apiClient, caster))) return;

                    chatClient.say('finncapp', 'Wanna make Finn open some RoxBoxes on stream? SUBSCRIBE! And then go to - https://www.rox.gg/users/FinnCapp/roxbox/finncapp-new-house-hype/freeclaim');
                }, 1000 * 60 * 30);
            }, 1000 * 60 * 60);
        }
    },
    "#itsjusttriz": {
        "testing": async (chatClient, apiClient) => {
            const caster = 'itsjusttriz';

            setInterval(async () => {
                if (!TimerManager.get('#itsjusttriz', 'testing')) return;
                if (!(await getStream(apiClient, caster))) return;

                console.log('Spam.')
                // chatClient.say('itsjusttriz', 'This works?!')
            }, 1000 * 5);
        }
    }
}