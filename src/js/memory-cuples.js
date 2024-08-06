const cards = [
  { id: 1, value: 'A' },
  { id: 2, value: 'A' },
  { id: 3, value: 'B' },
  { id: 4, value: 'B' },
  { id: 5, value: 'C' },
  { id: 6, value: 'C' },
  { id: 7, value: 'D' },
  { id: 8, value: 'D' },
  { id: 9, value: 'E' },
  { id: 10, value: 'E' },
  { id: 11, value: 'F' },
  { id: 12, value: 'F' }
];
// representa las cartas del juego. Cada carta tiene un id único y un value que se usa para emparejar las cartas.
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let attempts = 0;
const maxAttempts = 10;
// Estas variables se usan para manejar el estado del juego:

// firstCard y secondCard guardan las cartas que se están comparando.
// lockBoard se usa para prevenir que se volteen más de dos cartas a la vez.
// matches cuenta el número de parejas encontradas.
// attempts cuenta el número de intentos hechos por el jugador.
// maxAttempts establece el máximo número de intentos permitidos.
const shuffle = array => array.sort(() => Math.random() - 0.5);
// Esta función mezcla las cartas aleatoriamente.
const createBoard = () => {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = ''; // limpia el tablero
  shuffle(cards);

  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.id = card.id;
    cardElement.dataset.value = card.value;
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });
};
// crea el tablero de juego:

// Limpia el tablero.
// Baraja las cartas.
// Crea un elemento div para cada carta, les añade clases y atributos, y un evento de clic que llama a flipCard.
// Añade las cartas al tablero.
const flipCard = event => {
  if (lockBoard) return;
  if (event.target === firstCard) return;

  const card = event.target;
  card.classList.add('flip');
  card.textContent = card.dataset.value;

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;

  checkForMatch();
};
// voltear una carta
// maneja el evento de clic en una carta:

// Evita que se volteen más de dos cartas a la vez (lockBoard).
// Evita que se vuelva a voltear la misma carta.
// Voltea la carta y muestra su valor.
// Si no hay ninguna carta volteada, guarda la carta actual como firstCard.
// Si ya hay una carta volteada, guarda la segunda carta como secondCard, bloquea el tablero y llama a checkForMatch para verificar si las cartas coinciden.
const checkForMatch = () => {
  firstCard.dataset.value === secondCard.dataset.value ? disableCards() : unflipCards();
  attempts++;
  if (attempts >= maxAttempts && matches < cards.length / 2) {
    showMessage('Game Over');
  }
};
// verifica si las cartas coinciden:

// Si las cartas coinciden, llama a disableCards, si no, llama a unflipCards.
// Incrementa el número de intentos.
// Si los intentos superan el máximo permitido y no se han encontrado todas las parejas, muestra el mensaje "Game Over".

const disableCards = () => {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  matches += 1;
  if (matches === cards.length / 2) {
    showMessage('You Win!');
  }
  resetBoard();
};
// deshabilita las cartas que coinciden:

// Remueve el evento de clic de las cartas.
// Incrementa el número de parejas encontradas.
// Si se han encontrado todas las parejas, muestra el mensaje "You Win!".
// Llama a resetBoard para reiniciar el estado del tablero
const unflipCards = () => {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    firstCard.textContent = '';
    secondCard.textContent = '';
    resetBoard();
  }, 1000);
};
// vuelve a voltear las cartas que no coinciden:

// Después de un segundo, remueve la clase flip y el texto de las cartas.
// Llama a resetBoard para reiniciar el estado del tablero.
const resetBoard = () => {
  [firstCard, secondCard, lockBoard] = [null, null, false];
};
// reinicia las variables del tablero a su estado inicial.
const showMessage = message => {
  document.getElementById('message-text').textContent = message;
  document.getElementById('message').style.display = 'block';
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.removeEventListener('click', flipCard));
};
// muestra un mensaje al jugador:

// Cambia el contenido del mensaje.
// Muestra el mensaje.
// Desactiva todos los eventos de clic en las cartas.
const restartGame = () => {
  matches = 0;
  attempts = 0;
  document.getElementById('message').style.display = 'none';
  createBoard();
};
// reinicia el juego:

// Reinicia las variables matches y attempts.
// Oculta el mensaje.
// Vuelve a crear el tablero.
createBoard();
// Inicializar el juego y el evento de reinicio
document.getElementById('restart-button').addEventListener('click', restartGame);
