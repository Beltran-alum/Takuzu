// ==========================
// 1. VARIABLES GLOBALES
// ==========================

// Recuperamos la configuración guardada
const size = localStorage.getItem("size");
const boardIndex = localStorage.getItem("board");

// Tablero actual
let board;

// Matriz que indica qué casillas son fijas
let fixed = [];

// Celdas que contienen errores
let errorCells = [];

// Mensaje de error actual
let errorMessage = "";

// Elemento HTML donde se muestra el error
let errorBox = null;



// ==========================
// 2. CARGAR TABLERO
// ==========================

// Seleccionamos el tablero según tamaño y número
if (size === "petit") {
    board = (boardIndex === "0") ? PETIT_1 : PETIT_2;
} else if (size === "mitja") {
    board = (boardIndex === "0") ? MITJA_1 : MITJA_2;
} else {
    board = (boardIndex === "0") ? GRAN_1 : GRAN_2;
}

// Hacemos una copia profunda para no modificar el original
board = JSON.parse(JSON.stringify(board));



// ==========================
// 3. MARCAR CASILLAS FIJAS
// ==========================

for (let i = 0; i < board.length; i++) {
    fixed[i] = [];

    for (let j = 0; j < board[i].length; j++) {
        // Una casilla es fija si NO está vacía
        fixed[i][j] = board[i][j] !== "";
    }
}



// ==========================
// 4. COMPROBAR SI EL TABLERO ESTÁ LLENO
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
// 5. VALIDAR TABLERO (REGLAS TAKUZU)
// ==========================

function checkWin() {

    errorMessage = "";
    errorCells = [];

    const n = board.length;
    const half = n / 2;

    // 1. Comprobar si hay casillas vacías
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === "") {
                errorMessage = "❌ El tablero está incompleto";
                return false;
            }
        }
    }

    // 2. Tres números iguales seguidos en una FILA
    for (let fila = 0; fila < n; fila++) {
        for (let col = 0; col < n - 2; col++) {

            const a = board[fila][col];
            const b = board[fila][col + 1];
            const c = board[fila][col + 2];

            if (a === b && a === c) {
                errorMessage = "❌ Hay números seguidos en una fila";

                for (let x = 0; x < n; x++) {
                    errorCells.push([fila, x]);
                }

                return false;
            }
        }
    }

    // 3. Tres números iguales seguidos en una COLUMNA
    for (let col = 0; col < n; col++) {
        for (let fila = 0; fila < n - 2; fila++) {

            const a = board[fila][col];
            const b = board[fila + 1][col];
            const c = board[fila + 2][col];

            if (a === b && a === c) {
                errorMessage = "❌ Hay números seguidos en una columna";

                for (let x = 0; x < n; x++) {
                    errorCells.push([x, col]);
                }

                return false;
            }
        }
    }

    // 4. Balance correcto en FILAS
    for (let fila = 0; fila < n; fila++) {

        let zeros = 0;
        let ones = 0;

        for (let col = 0; col < n; col++) {
            if (board[fila][col] === "0") zeros++;
            if (board[fila][col] === "1") ones++;
        }

        if (zeros !== half || ones !== half) {
            errorMessage = "❌ Fila mal balanceada";

            for (let x = 0; x < n; x++) {
                errorCells.push([fila, x]);
            }

            return false;
        }
    }

    // 5. Balance correcto en COLUMNAS
    for (let col = 0; col < n; col++) {

        let zeros = 0;
        let ones = 0;

        for (let fila = 0; fila < n; fila++) {
            if (board[fila][col] === "0") zeros++;
            if (board[fila][col] === "1") ones++;
        }

        if (zeros !== half || ones !== half) {
            errorMessage = "❌ Columna mal balanceada";

            for (let x = 0; x < n; x++) {
                errorCells.push([x, col]);
            }

            return false;
        }
    }

    return true;
}



// ==========================
// 6. CLICK EN UNA CASILLA
// ==========================

function handleClick(event) {

    const fila = Number(event.target.dataset.row);
    const col = Number(event.target.dataset.col);

    // No permitir modificar casillas fijas
    if (fixed[fila][col]) return;

    // Rotación: vacío → 0 → 1 → vacío
    if (board[fila][col] === "") board[fila][col] = "0";
    else if (board[fila][col] === "0") board[fila][col] = "1";
    else board[fila][col] = "";

    renderBoard();

    const valid = checkWin();

    if (errorBox) {
        errorBox.textContent = isBoardFull() ? errorMessage : "";
    }

    if (isBoardFull() && valid) {
        alert("🎉 ¡HAS GUANYAT!");
        window.location.href = "../html/benvinguda.html";
    }
}



// ==========================
// 7. DIBUJAR TABLERO
// ==========================

function renderBoard() {

    const container = document.getElementById("board");
    container.innerHTML = "";

    container.style.display = "grid";
    container.style.gridTemplateColumns = `repeat(${board[0].length}, 44px)`;
    container.style.gap = "0";

    for (let fila = 0; fila < board.length; fila++) {
        for (let col = 0; col < board[fila].length; col++) {

            const celda = document.createElement("div");
            celda.classList.add("cell");

            celda.textContent = board[fila][col] || "";

            celda.dataset.row = fila;
            celda.dataset.col = col;

            if (fixed[fila][col]) {
                celda.classList.add("fixed");
            }

            // Marcar errores
            for (let k = 0; k < errorCells.length; k++) {
                const [r, c] = errorCells[k];
                if (r === fila && c === col) {
                    celda.classList.add("error");
                }
            }

            celda.addEventListener("click", handleClick);
            container.appendChild(celda);
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
