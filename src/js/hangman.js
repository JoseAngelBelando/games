// Flujo
// 1.Dividir la palabra en letras individuales.
// 2.Transformar cada letra, mostrando letras adivinadas y ocultando las no adivinadas.
// 3.Unir las letras transformadas en una cadena.
// 4.Actualizar el elemento HTML con esta cadena.

// Palabras posibles para el juego.
const words = ['javascript', 'programacion', 'html', 'css', 'computadora'];
const selectedWord = words[Math.floor(Math.random() * words.length)]; // Selecciona una palabra aleatoria.
let guessedLetters = []; // Almacena las letras adivinadas correctamente.
let attempts = 6; // Número de intentos permitidos.

// Función para mostrar la palabra oculta.
const displayWord = () => {
  // .split convierte esta palabra en una lista (array) de caracteres individuales.
  const wordDisplay = selectedWord
    .split('')
    // .map hace un mapeo de los caracteres, si estan incluidos en la plabra guessedLetters devuelve la letra
    .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
    // .join une todos los elementos de la lista resultante en una cadena, separándolos por un espacio
    .join(' ');
  document.getElementById('word').textContent = wordDisplay;
};

// Función para procesar la letra adivinada.
const guessLetter = () => {
  const letter = document.getElementById('letter').value.toLowerCase();
  document.getElementById('letter').value = ''; // Limpia el campo de entrada.

  if (!letter || guessedLetters.includes(letter) || attempts === 0) {
    return; // Sale de la función si la letra no es válida, ya fue adivinada o no hay intentos restantes.
  }

  if (selectedWord.includes(letter)) {
    guessedLetters.push(letter); // Agrega la letra adivinada a la lista.
    displayWord(); // Actualiza la palabra mostrada.
    if (!document.getElementById('word').textContent.includes('_')) {
      document.getElementById('message').textContent = '¡Ganaste!'; // Mensaje de victoria.
    }
  } else {
    attempts--;
    if (attempts === 0) {
      document.getElementById('message').textContent = `Perdiste. La palabra era: ${selectedWord}`; // Mensaje de derrota.
    } else {
      document.getElementById('message').textContent = `Intentos restantes: ${attempts}`; // Muestra intentos restantes.
    }
  }
};

// Añade el evento de clic al botón después de que el DOM se ha cargado.
document.getElementById('guessButton').addEventListener('click', guessLetter);

// Inicializa el juego mostrando la palabra oculta.
displayWord();
