const prompt = require("prompt-sync")({ sigint: true });

const { mostrarMenu, leerInteraccio } = require("./Menu.js");
const { instruccions } = require("./instruccions");

module.exports = {
    mostrarMenu,
    leerInteraccio,
    instruccions
};