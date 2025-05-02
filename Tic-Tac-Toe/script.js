const game = document.getElementById("game");
const status = document.getElementById("status");
const mainScreen = document.getElementById("main-screen");
const resultScreen = document.getElementById("result-screen");
const resultMessage = document.getElementById("result-message");

let currentPlayer = "X";
let board = Array(9).fill("");
let gameOver = false;

function createBoard() {
  game.innerHTML = "";
  board.forEach((val, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = val;
    cell.addEventListener("click", () => handleMove(index));
    game.appendChild(cell);
  });
}

function handleMove(index) {
  if (board[index] !== "" || gameOver) return;
  board[index] = currentPlayer;
  createBoard();
  if (checkWin()) {
    showResult(`${currentPlayer} wins!`);
    gameOver = true;
    return;
  }
  if (board.every(cell => cell !== "")) {
    showResult("It's a draw!");
    gameOver = true;
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function showResult(message) {
  resultMessage.textContent = message;
  mainScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
}

function startNewGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  status.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
  mainScreen.classList.remove("hidden");
  resultScreen.classList.add("hidden");
}

startNewGame();
