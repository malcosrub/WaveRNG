let paused = true;
let socket;

function connectToServer() {
    // Conexión WebSocket (simulando una conexión al servidor que envía los números aleatorios)
    socket = new WebSocket('ws://localhost:666'); // Cambiar a la dirección correcta

    socket.onmessage = function(event) {
        if (!paused) {
            document.getElementById('random-number').innerText = event.data;
        }
    };

    socket.onclose = function() {
        console.log('Conexión cerrada, intentando reconectar...');
        setTimeout(connectToServer, 1000); // Intentar reconectar cada segundo
    };
}

function togglePause() {
    paused = !paused;

    if (paused) {
        document.getElementById('pause-button').innerText = "Continuar"

    } else {
        document.getElementById('pause-button').innerText = "Pausar"

    }
}

connectToServer();