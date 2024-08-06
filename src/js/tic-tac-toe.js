const board = document.getElementById('board');
const cells = Array.from(document.getElementsByClassName('cell'));
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

// Jugador
const PLAYER_X = 'X';
// CPU
const PLAYER_O = 'O';
let currentPlayer = PLAYER_X;
// tablero con 9 espacios vacios
let gameBoard = ['', '', '', '', '', '', '', '', ''];
// indica si el jkuego esta activo
let gameActive = true;
// define todas las combinaciones de tablero ganadoras
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleCellClick = click => {
  const cell = click.target;
  const index = cell.getAttribute('data-index');

  if (gameBoard[index] !== '' || !gameActive || currentPlayer === PLAYER_O) {
    return;
  }

  makeMove(index, PLAYER_X);

  if (checkWin()) {
    messageElement.textContent = `¡ has ganado!`;
    gameActive = false;
    return;
  }

  if (gameBoard.every(cell => cell !== '')) {
    messageElement.textContent = '¡Empate!';
    gameActive = false;
    return;
  }

  currentPlayer = PLAYER_O;
  messageElement.textContent = `Turno de la CPU`;
  cpuMove();
};

const cpuMove = () => {
  if (!gameActive) return;

  const availableMoves = gameBoard.map((value, index) => (value === '' ? index : null)).filter(index => index !== null);

  const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];

  makeMove(randomMove, PLAYER_O);

  if (checkWin()) {
    messageElement.textContent = `¡PC ha ganado!`;
    gameActive = false;
    return;
  }

  if (gameBoard.every(cell => cell !== '')) {
    messageElement.textContent = '¡Empate!';
    gameActive = false;
    return;
  }

  currentPlayer = PLAYER_X;
  messageElement.textContent = `Turno del jugador: ${PLAYER_X}`;
};

const makeMove = (index, player) => {
  gameBoard[index] = player;
  cells[index].textContent = player;
};

const checkWin = () => {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return gameBoard[index] === currentPlayer;
    });
  });
};

const restartGame = () => {
  currentPlayer = PLAYER_X;
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  messageElement.textContent = `Turno del jugador: ${PLAYER_X}`;
  cells.forEach(cell => {
    cell.textContent = '';
  });
};

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
messageElement.textContent = `Turno del jugador: ${PLAYER_X}`;
