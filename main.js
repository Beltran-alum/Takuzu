const prompt = require("prompt-sync")({ sigint: true });

const {
    mostrarMenu
} = require("./Funcions");


mostrarMenu()

let salir = false;
do {
    console.clear();
    console.log("Nom del Grup TUSMUERTOS")

    switch (interact) {

        case 1: // Crear nuevo personaje
            console.clear();
            console.log("\nCreando un nuevo personaje...");

            personajeActual = CrearPers(personajeActual); // reemplaza el actual
            resetearEstadisticas(personajeActual);        // reiniciar estadísticas
            console.clear();




            console.log("Personaje creado:", personajeActual.Nom);
            prompt("\nPresiona cualquier tecla para continuar...");
            break;





        case 2: // Ver estadísticas
            console.clear();
            verEstadisticas(personajeActual);

            prompt("\nPresiona cualquier tecla para continuar...");
            break;




        case 3: // Luchar
            console.clear();
            luchar(personajeActual); // genera enemigo internamente

            prompt("\nPresiona cualquier tecla para continuar...");
            break;




        case 4: // Salir
            console.log("\nSaliendo del juego...");
            salir = true;
            break;





        default: // Opción no válida
            console.log("Opción no válida. Por favor, escoge de nuevo.");
            prompt("\nPresiona cualquier tecla para continuar...");
            break;
    }

} while (!salir);