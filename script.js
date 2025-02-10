const ROWS = 6;
const COLS = 7;
let currentPlayer = 'red'; // Alternates between 'red' and 'yellow'
let board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

const gameBoard = document.getElementById("gameBoard");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");

// Create the board dynamically
function createBoard() {
    gameBoard.innerHTML = "";
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener("click", () => dropPiece(c));
            gameBoard.appendChild(cell);
        }
    }
}

// Drop a piece in the selected column
function dropPiece(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            updateBoard();
            if (checkWin(row, col)) {
                status.textContent = `${currentPlayer.toUpperCase()} wins!`;
                disableClicks();
                return;
            }
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            status.textContent = `Player ${currentPlayer === 'red' ? 1 : 2}'s turn (${currentPlayer})`;
            return;
        }
    }
}

// Update the board UI
function updateBoard() {
    document.querySelectorAll(".cell").forEach(cell => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        cell.classList.remove("red", "yellow");
        if (board[row][col]) {
            cell.classList.add(board[row][col]);
        }
    });
}

// Check for a winning move
function checkWin(row, col) {
    const directions = [
        [0, 1], [1, 0], [1, 1], [1, -1] // Horizontal, Vertical, Diagonal right, Diagonal left
    ];

    for (let [dx, dy] of directions) {
        let count = 1;

        for (let dir of [-1, 1]) { // Check both directions
            let r = row + dx * dir;
            let c = col + dy * dir;
            while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
                count++;
                r += dx * dir;
                c += dy * dir;
            }
        }
        if (count >= 4) return true;
    }
    return false;
}

// Disable further clicks after a win
function disableClicks() {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.style.pointerEvents = "none";
    });
}

// Reset the game
resetButton.addEventListener("click", () => {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    currentPlayer = "red";
    status.textContent = "Player 1's turn (Red)";
    createBoard();
});

// Initialize the board
createBoard();
