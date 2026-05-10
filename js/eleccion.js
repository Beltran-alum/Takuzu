/**
 * Muestra una vista previa de un tablero dentro de un contenedor.
 * @param {Array} board - Matriz con los valores del tablero.
 * @param {string} containerId - ID del contenedor donde se dibuja.
 */
function renderPreview(board, containerId) {

    const container = document.getElementById(containerId);

    // Si no existe el contenedor, salimos
    if (!container) return;

    // Limpiamos el contenido anterior
    container.innerHTML = "";

    // Configuramos el grid según el tamaño del tablero
    const columnas = board[0].length;
    container.style.display = "grid";
    container.style.gridTemplateColumns = `repeat(${columnas}, 40px)`;
    container.style.gap = "5px";

    // Recorremos la matriz y creamos las celdas
    for (let fila = 0; fila < board.length; fila++) {
        for (let col = 0; col < board[fila].length; col++) {

            const celda = document.createElement("div");
            celda.classList.add("cell");

            const valor = board[fila][col];

            // Si es null o cadena vacía, mostramos vacío
            celda.textContent = (valor === null || valor === "") ? "" : valor;

            container.appendChild(celda);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {

    // =====================
    // PREVIEWS
    // =====================

    if (typeof PETIT_1 !== "undefined") renderPreview(PETIT_1, "petit");
    if (typeof PETIT_2 !== "undefined") renderPreview(PETIT_2, "petit2");

    if (typeof MITJA_1 !== "undefined") renderPreview(MITJA_1, "mitja");
    if (typeof MITJA_2 !== "undefined") renderPreview(MITJA_2, "mitja2");

    if (typeof GRAN_1 !== "undefined") renderPreview(GRAN_1, "gran");
    if (typeof GRAN_2 !== "undefined") renderPreview(GRAN_2, "gran2");


    // =====================
    // FUNCIÓN AUXILIAR
    // =====================

    /**
     * Guarda la selección en localStorage y abre la página del juego.
     */
    function goToGame(size, boardIndex) {
        localStorage.setItem("size", size);
        localStorage.setItem("board", boardIndex);
        window.location.href = "../html/jugar.html";
    }


    // =====================
    // ASIGNACIÓN DE EVENTOS
    // =====================

    function activarClick(idElemento, size, index) {
        const elemento = document.getElementById(idElemento);

        if (elemento) {
            elemento.addEventListener("click", function () {
                goToGame(size, index);
            });
        }
    }

    // PETIT
    activarClick("petit", "petit", "0");
    activarClick("petit2", "petit", "1");

    // MITJA
    activarClick("mitja", "mitja", "0");
    activarClick("mitja2", "mitja", "1");

    // GRAN
    activarClick("gran", "gran", "0");
    activarClick("gran2", "gran", "1");

});
