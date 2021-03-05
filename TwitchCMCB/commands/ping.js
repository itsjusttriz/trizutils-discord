export default {
    name: 'ping',
    usage: 'n!ping',
    aliases: ['pong'],
    run(chatClient, message, args, options) {
        // console.log('Checking Ping:', this.pingCheck(options.msg))

        if (!options.isBotAdmin) return;

        return chatClient.say(options.channel, options.disabledCommand);
    }
}

/*
IrcClient.prototype.pingCheck = function () {
        var _this = this;
        var now = Date.now();
        var nowStr = now.toString();
        var handler = this.onTypedMessage(Commands_1.Pong, function (msg) {
            var message = msg.params.message;
            if (message === nowStr) {
                const p = new Promise((resolve, reject) => {
                    resolve(Date.now() - now);
                }).then((val) => {
                    return `Current Ping: ${val}ms`;
                }).catch(console.error)
                return p
                // if (_this._pingTimeoutTimer) {
                //     clearTimeout(_this._pingTimeoutTimer);
                // }
                // _this.removeMessageListener(handler);
            }
        });
}*/