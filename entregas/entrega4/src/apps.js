import express from 'express';
import http from "http";
import { cartRouter } from './routes/carts.routes.js';
import { productRouter } from './routes/products.routes.js';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';

const PORT = 8080;
const app = express();
const httpServer = http.createServer(app); // Crear un servidor HTTP usando Express

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
});

// Configuración de Socket.io en el servidor HTTP
const io = new Server(httpServer);

// Manejo de conexiones de Socket.io
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Escucha los eventos y maneja las interacciones de los sockets
    socket.on('message', (data) => {
        console.log(data);
    });

    // ... (agrega aquí la lógica para los eventos de sockets según sea necesario)
});

// Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

