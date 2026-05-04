const prompt = require("prompt-sync")({ sigint: true });

function mostrarMenu() {
    console.log("BENVINGUT A TAKUZU")
    console.log("Pulsa espai per a continuar...")
    prompt()

    console.log("1. Instruccions")
    console.log("2. Veure taulers")
    console.log("3. Jugar")
    console.log("4. Sortir")
}

function leerInteraccio(max) {
    let Interaccio;
    do {
        Interaccio = parseInt(prompt("> "));
    } while (isNaN(Interaccio) || Interaccio < 1 || Interaccio > max);

    return Interaccio;
}


module.exports = { mostrarMenu, leerInteraccio };