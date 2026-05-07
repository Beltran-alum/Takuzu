// ==========================
// 1. RECUPERAR DATOS
// ==========================

const size = localStorage.getItem("size");
const boardIndex = localStorage.getItem("board");

let board;
let fixed = [];


// ==========================
// 2. CARGAR TABLERO
// ==========================

if (size === "petit") {
    board = (boardIndex === "0") ? PETIT_1 : PETIT_2;
}

if (size === "mitja") {
    board = (boardIndex === "0") ? MITJA_1 : MITJA_2;
}

if (size === "gran") {
    board = (boardIndex === "0") ? GRAN_1 : GRAN_2;
}

// copia para no modificar original
board = JSON.parse(JSON.stringify(board));


// ==========================
// 3. MARCAR CASILLAS FIJAS
// ==========================

fixed = JSON.parse(JSON.stringify(board));

for (let i = 0; i < fixed.length; i++) {
    for (let j = 0; j < fixed[i].length; j++) {
        fixed[i][j] = (fixed[i][j] !== "");
    }
}


// ==========================
// 4. TABLERO LLENO
// ==========================

function isBoardFull() {

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === "") {
                return false;
            }
        }
    }

    return true;
}


// ==========================
// 5. VICTORIA (BÁSICA CORREGIDA)
// ==========================

function checkWin() {

    const n = board.length;
    const half = n / 2;

    // 1. No vacíos
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === "") return false;
        }
    }

    // 2. No 3 seguidos en filas
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - 2; j++) {

            if (board[i][j] === board[i][j+1] &&
                board[i][j] === board[i][j+2]) {
                return false;
            }
        }
    }

    // 3. No 3 seguidos en columnas
    for (let j = 0; j < n; j++) {
        for (let i = 0; i < n - 2; i++) {

            if (board[i][j] === board[i+1][j] &&
                board[i][j] === board[i+2][j]) {
                return false;
            }
        }
    }

    // 4. Balance 0 y 1 por fila
    for (let i = 0; i < n; i++) {

        let zeros = 0;
        let ones = 0;

        for (let j = 0; j < n; j++) {
            if (board[i][j] === "0") zeros++;
            if (board[i][j] === "1") ones++;
        }

        if (zeros !== half || ones !== half) return false;
    }

    // 5. Balance 0 y 1 por columna
    for (let j = 0; j < n; j++) {

        let zeros = 0;
        let ones = 0;

        for (let i = 0; i < n; i++) {
            if (board[i][j] === "0") zeros++;
            if (board[i][j] === "1") ones++;
        }

        if (zeros !== half || ones !== half) return false;
    }

    // 6. filas duplicadas
    for (let i = 0; i < n; i++) {
        for (let k = i + 1; k < n; k++) {
            if (JSON.stringify(board[i]) === JSON.stringify(board[k])) {
                return false;
            }
        }
    }

    // 7. columnas duplicadas
    for (let j = 0; j < n; j++) {

        let col1 = [];
        for (let i = 0; i < n; i++) {
            col1.push(board[i][j]);
        }

        for (let j2 = j + 1; j2 < n; j2++) {

            let col2 = [];
            for (let i = 0; i < n; i++) {
                col2.push(board[i][j2]);
            }

            if (JSON.stringify(col1) === JSON.stringify(col2)) {
                return false;
            }
        }
    }

    return true;
}

// ==========================
// 6. CLICK CASILLAS
// ==========================

function handleClick(e) {

    const i = e.target.dataset.row;
    const j = e.target.dataset.col;

    // no tocar fijas
    if (fixed[i][j]) return;

    // ciclo: vacío → 0 → 1 → vacío
    if (board[i][j] === "") {
        board[i][j] = "0";
    }
    else if (board[i][j] === "0") {
        board[i][j] = "1";
    }
    else {
        board[i][j] = "";
    }

    renderBoard();

    // SOLO comprobar cuando esté lleno
    if (isBoardFull()) {

        if (checkWin()) {

            alert("🎉 ¡HAS GANADO EL TAKUZU!");
            window.location.href = "../html/benvinguda.html";

        } else {

            alert("❌ Tablero completo pero incorrecto");
        }
    }
}


// ==========================
// 7. RENDER TABLERO
// ==========================

function renderBoard() {

    const container = document.getElementById("board");

    container.innerHTML = "";

    container.style.display = "grid";
    container.style.gridTemplateColumns =
        "repeat(" + board[0].length + ", 40px)";
    container.style.gap = "0";

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {

            const div = document.createElement("div");
            div.classList.add("cell");

            const cell = board[i][j];

            div.textContent = (cell === "") ? "" : cell;

            div.dataset.row = i;
            div.dataset.col = j;

            // casillas fijas visuales
            if (fixed[i][j]) {
                div.style.fontWeight = "bold";
                div.style.backgroundColor = "#ddd";
            }

            div.addEventListener("click", handleClick);

            container.appendChild(div);
        }
    }
}


// ==========================
// 8. INICIO
// ==========================

document.addEventListener("DOMContentLoaded", function () {

    const info = document.getElementById("info");

    if (info) {
        info.textContent =
            "Estás jugando: " + size + " - tablero " + (parseInt(boardIndex) + 1);
    }

    renderBoard();
});