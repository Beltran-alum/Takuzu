const prompt = require("prompt-sync")({ sigint: true });
const {
    mostrarMenu,
    leerInteraccio,
    instruccions
} = require("./Funcions");

mostrarMenu()

let salir = false;
do {


    let interact = leerInteraccio(4); // Elegir acción (1-4)

    switch (interact) {

        case 1: // Instruccions

            console.clear();

            instruccions();

            break;





        case 2: // Taulers

            console.clear();

            break;




        case 3: // Jugar

            console.clear();

            break;




        case 4: // Sortir

            console.log("\nSaliendo del juego...");
            salir = true;

            break;



        default: // Opción no válida
            console.log("Opción no válida. Por favor, escoge de nuevo.");
            prompt("\nPresiona cualquier tecla para continuar...");
            break;
    }

} while (!salir);