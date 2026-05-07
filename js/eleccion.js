function renderPreview(board, containerId) {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    container.style.display = "grid";
    container.style.gridTemplateColumns =
        "repeat(" + board[0].length + ", 40px)";
    container.style.gap = "5px";

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {

            const div = document.createElement("div");
            div.classList.add("cell");

            const cell = board[i][j];

            div.textContent =
                (cell === null || cell === "") ? "" : cell;

            container.appendChild(div);
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

    function goToGame(size, boardIndex) {
        localStorage.setItem("size", size);
        localStorage.setItem("board", boardIndex);
        window.location.href = "../html/jugar.html";
    }


    // =====================
    // PETIT
    // =====================

    const petit1 = document.getElementById("petit");
    const petit2 = document.getElementById("petit2");

    if (petit1) {
        petit1.addEventListener("click", function () {
            goToGame("petit", "0");
        });
    }

    if (petit2) {
        petit2.addEventListener("click", function () {
            goToGame("petit", "1");
        });
    }


    // =====================
    // MITJA
    // =====================

    const mitja1 = document.getElementById("mitja");
    const mitja2 = document.getElementById("mitja2");

    if (mitja1) {
        mitja1.addEventListener("click", function () {
            goToGame("mitja", "0");
        });
    }

    if (mitja2) {
        mitja2.addEventListener("click", function () {
            goToGame("mitja", "1");
        });
    }


    // =====================
    // GRAN
    // =====================

    const gran1 = document.getElementById("gran");
    const gran2 = document.getElementById("gran2");

    if (gran1) {
        gran1.addEventListener("click", function () {
            goToGame("gran", "0");
        });
    }

    if (gran2) {
        gran2.addEventListener("click", function () {
            goToGame("gran", "1");
        });
    }

});