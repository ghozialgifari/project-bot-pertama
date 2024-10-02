const telegramBot = require("node-telegram-bot-api")
const token = "7816338224:AAGWa9qr30cEmA3W-wSIf2V1Om0i4UObXMQ"
const options = {
    polling: true
}

const zyybot = new telegramBot(token, options)

const prefix = "."
const sayHi = new RegExp(`^${prefix}halo$`)
const gempa = new RegExp(`^${prefix}gempa$`)

zyybot.onText(sayHi, (callback) => {
    zyybot.sendMessage(callback.from.id, "Halo juga!")
})

zyybot.onText(gempa, async (callback) => {
    const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/"

    const apiCall = await fetch(BMKG_ENDPOINT + "autogempa.json")
    const {
        Infogempa: {
            gempa: {
                Jam, Magnitude, Tanggal, Wilayah, Potensi, Kedalaman, Lintang, Bujur, Coordinates,
                DateTime, Shakemap
            }
        }
    } = await apiCall.json()

    const BMKGImage = BMKG_ENDPOINT + Shakemap
    const resultText = `
Coordinat: ${Lintang} | ${Bujur} | ${Coordinates}
Waktu: ${Tanggal} | ${Jam} | ${DateTime}
Besaran: ${Magnitude} SR
Wilayah: ${Wilayah}
Potensi: ${Potensi}
Kedalaman: ${Kedalaman}`          

    zyybot.sendPhoto(callback.from.id, BMKGImage, {
        caption: resultText
    })
})
