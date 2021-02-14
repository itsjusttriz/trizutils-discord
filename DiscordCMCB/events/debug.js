export default function (client, info) {
    if (client.config.debugMode == true) {
        console.log(info)
    }
}