const prompt = require("prompt-sync")({ sigint: true });

function mostrarMenu() {
    console.log("BENVINGUT A TAKUZU")
    console.log("Pulsa espai per a continuar...")
    prompt()

    console.log("1. Instruccions del Joc")
    console.log("2. Instruccions del Joc")
}

module.exports = { mostrarMenu };