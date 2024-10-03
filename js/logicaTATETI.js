// Variables para el estado del juego
let tablero = ['', '', '', '', '', '', '', '', '']; // Representa el estado actual del tablero con 9 celdas vacías
let jugadorActual = 'X'; // El jugador 'X' empieza el juego
let juegoActivo = true; // Controla si el juego está en curso o ha terminado

// Combinaciones ganadoras
const combinacionesGanadoras = [
    [0, 1, 2], // Primera fila
    [3, 4, 5], // Segunda fila
    [6, 7, 8], // Tercera fila
    [0, 3, 6], // Primera columna
    [1, 4, 7], // Segunda columna
    [2, 5, 8], // Tercera columna
    [0, 4, 8], // Diagonal principal (de arriba a la izquierda hacia abajo a la derecha)
    [2, 4, 6]  // Diagonal secundaria (de arriba a la derecha hacia abajo a la izquierda)
];

// Seleccionar todas las celdas del tablero y el botón de reinicio
const celdas = document.querySelectorAll('.celda'); // Selecciona todas las celdas del tablero
const botonReiniciar = document.getElementById('reiniciar'); // Selecciona el botón de reinicio

// Función que maneja los clics en las celdas
function manejarClick(event) {
    const indiceCelda = event.target.getAttribute('data-index'); // Obtiene el índice de la celda que fue clicada

    // Solo hacer algo si la celda está vacía y el juego está activo
    if (tablero[indiceCelda] === '' && juegoActivo) {
        tablero[indiceCelda] = jugadorActual; // Marca la celda con el símbolo del jugador actual
        event.target.textContent = jugadorActual; // Muestra el símbolo del jugador actual en la interfaz

        // Verificar si hay un ganador o empate
        verificarResultado(); // Llama a la función para comprobar si el juego ha terminado
        // Cambiar el turno
        cambiarJugador(); // Cambia al otro jugador
    }
}

// Función para cambiar de jugador
function cambiarJugador() {
    jugadorActual = jugadorActual === 'X' ? 'O' : 'X'; // Cambia entre los jugadores 'X' y 'O'
}

// Función para verificar si hay un ganador o empate
function verificarResultado() {
    let rondaGanada = false; // Variable para verificar si alguien ha ganado

    // Verificar combinaciones ganadoras
    for (let i = 0; i < combinacionesGanadoras.length; i++) {
        const [a, b, c] = combinacionesGanadoras[i]; // Desestructura los índices de una combinación ganadora
        if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) { // Comprueba si las tres celdas coinciden
            rondaGanada = true; // Si hay coincidencia, se marca que hay un ganador
            break; // Sale del bucle si se encuentra un ganador
        }
    }
    // Si hay un ganador, termina el juego
    if (rondaGanada) {
        juegoActivo = false; // Detiene el juego
        alert(`Jugador ${jugadorActual} ha ganado!`); // Muestra una alerta con el jugador ganador
    } else if (!tablero.includes('')) { // Si todas las celdas están llenas y no hay ganador
        // Si el tablero está lleno y no hay ganador, es un empate
        juegoActivo = false; // Detiene el juego
        alert('Es un empate!'); // Muestra una alerta indicando que fue empate
    }
}


// Función para reiniciar el juego
function reiniciarJuego() {
    tablero = ['', '', '', '', '', '', '', '', '']; // Reinicia el estado del tablero
    juegoActivo = true; // Reactiva el juego
    jugadorActual = 'X'; // El jugador 'X' vuelve a empezar
    celdas.forEach(celda => celda.textContent = ''); // Limpia el contenido de todas las celdas en la interfaz
}

// Asignar los eventos a cada celda y al botón de reinicio
celdas.forEach(celda => celda.addEventListener('click', manejarClick)); // Añade un evento de clic a cada celda
botonReiniciar.addEventListener('click', reiniciarJuego); // Añade un evento de clic al botón de reinicio



