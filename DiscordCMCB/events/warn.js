export default function (client, info) {
    if (client.config.warnMode == true) {
        console.log(info)
    }
}