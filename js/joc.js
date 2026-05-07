// ==========================
// 1. VARIABLES GLOBALES
// ==========================

const size = localStorage.getItem("size");
const boardIndex = localStorage.getItem("board");

let board;
let fixed = [];
let errorCells = [];
let errorMessage = "";
let errorBox = null;


// ==========================
// 2. CARGAR TABLERO
// ==========================

if (size === "petit") {
    board = (boardIndex === "0") ? PETIT_1 : PETIT_2;
} else if (size === "mitja") {
    board = (boardIndex === "0") ? MITJA_1 : MITJA_2;
} else {
    board = (boardIndex === "0") ? GRAN_1 : GRAN_2;
}

// copia segura
board = JSON.parse(JSON.stringify(board));


// ==========================
// 3. CASILLAS FIJAS
// ==========================

fixed = [];

for (let i = 0; i < board.length; i++) {
    fixed[i] = [];
    for (let j = 0; j < board[i].length; j++) {
        fixed[i][j] = board[i][j] !== "";
    }
}


// ==========================
// 4. TABLERO LLENO
// ==========================

function isBoardFull() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === "") return false;
        }
    }
    return true;
}


// ==========================
// 5. CHECK WIN
// ==========================

function checkWin() {

    errorMessage = "";
    errorCells = [];

    const n = board.length;
    const half = n / 2;

    // 1. incompleto
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === "") {
                errorMessage = "❌ El tablero está incompleto";
                return false;
            }
        }
    }

    // ==========================
    // 2. números seguidos en fila
    // ==========================
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - 2; j++) {

            if (
                board[i][j] === board[i][j + 1] &&
                board[i][j] === board[i][j + 2]
            ) {
                errorMessage = "❌ Hay números seguidos en una fila";

                for (let x = 0; x < n; x++) {
                    errorCells.push([i, x]);
                }

                return false;
            }
        }
    }

    // ==========================
    // 3. números seguidos en columna
    // ==========================
    for (let j = 0; j < n; j++) {
        for (let i = 0; i < n - 2; i++) {

            if (
                board[i][j] === board[i + 1][j] &&
                board[i][j] === board[i + 2][j]
            ) {
                errorMessage = "❌ Hay números seguidos en una columna";

                for (let x = 0; x < n; x++) {
                    errorCells.push([x, j]);
                }

                return false;
            }
        }
    }

    // ==========================
    // 4. balance filas
    // ==========================
    for (let i = 0; i < n; i++) {

        let zeros = 0;
        let ones = 0;

        for (let j = 0; j < n; j++) {
            if (board[i][j] === "0") zeros++;
            if (board[i][j] === "1") ones++;
        }

        if (zeros !== half || ones !== half) {
            errorMessage = "❌ fila mal balanceada";

            for (let x = 0; x < n; x++) {
                errorCells.push([i, x]);
            }

            return false;
        }
    }

    // ==========================
    // 5. balance columnas
    // ==========================
    for (let j = 0; j < n; j++) {

        let zeros = 0;
        let ones = 0;

        for (let i = 0; i < n; i++) {
            if (board[i][j] === "0") zeros++;
            if (board[i][j] === "1") ones++;
        }

        if (zeros !== half || ones !== half) {
            errorMessage = "❌ columna mal balanceada";

            for (let x = 0; x < n; x++) {
                errorCells.push([x, j]);
            }

            return false;
        }
    }

    return true;
}


// ==========================
// 6. CLICK
// ==========================

function handleClick(e) {

    const i = Number(e.target.dataset.row);
    const j = Number(e.target.dataset.col);

    if (fixed[i][j]) return;

    if (board[i][j] === "") board[i][j] = "0";
    else if (board[i][j] === "0") board[i][j] = "1";
    else board[i][j] = "";

    renderBoard();

    const valid = checkWin();

    if (errorBox) {
        errorBox.textContent = isBoardFull() ? errorMessage : "";
    }

    if (isBoardFull() && valid) {
        alert("🎉 ¡HAS GANADO!");
        window.location.href = "../html/benvinguda.html";
    }
}


// ==========================
// 7. RENDER
// ==========================

function renderBoard() {

    const container = document.getElementById("board");
    container.innerHTML = "";

    container.style.display = "grid";
    container.style.gridTemplateColumns =
        `repeat(${board[0].length}, 44px)`;

    container.style.gap = "0";

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {

            const div = document.createElement("div");
            div.classList.add("cell");

            div.textContent = board[i][j] || "";

            div.dataset.row = i;
            div.dataset.col = j;

            if (fixed[i][j]) {
                div.classList.add("fixed");
            }

            for (let k = 0; k < errorCells.length; k++) {

                const [r, c] = errorCells[k];

                if (r === i && c === j) {
                    div.classList.add("error");
                }
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

    errorBox = document.getElementById("error");

    const info = document.getElementById("info");

    if (info) {
        info.textContent =
            `Estás jugando: ${size} - tablero ${parseInt(boardIndex) + 1}`;
    }

    renderBoard();
});