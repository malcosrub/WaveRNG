const WebSocket = require('ws');
const { SerialPort } = require('serialport');
const Readline = require('@serialport/parser-readline');



let ubicacion = 666;
let puerto = 'COM10'



// Configura websocket
const wss = new WebSocket.Server({ port: ubicacion });

// IMPORTANTE cambiar el path por el puerto en el que esta el Arduino
const port = new SerialPort({
    path: puerto,
    baudRate: 9600
});

// Parser para leer los datos del puerto serie
const parser = port.pipe(new Readline.ReadlineParser({ delimiter: '\n' }));

// Cuando un cliente se conecta al WebSocket
wss.on('connection', function connection(ws) {
    console.log('Conexión establecida.');

    // Envía los datos del puerto serie al cliente WebSocket
    parser.on('data', function(data) {
        ws.send(data);
    });

    ws.on('close', () => {
        console.warn('Conexión interrumpida.\n');
    });
});

console.log('WebSocket esperando conexión en ws://localhost:'+ubicacion);