import express from "express";
import {engine} from "express-handlebars"
import viewRouter from "./routes/views.route.js";

import __dirname from "./utils.js";
import {Server} from "socket.io";

const PORT = 8080;
let mesagges = [];
const app = express();

const httpserver = app.listen(PORT, ()=> console.log(`Servidor funcionando en el puerto : ${PORT}`));

//const io = new Server(httpserver);
const socketServer = new Server(httpserver);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));

app.use("/", viewRouter);

socketServer.on("connection", socket =>{
    console.log('Nuevo cliente conectado');

    socket.on("message", data =>{
        console.log(data);
    })
    socket.emit("evento_para_mi", "evento solo para el que se conecto")
    socket.broadcast.emit("evento_no_para_mi", "Hola soy un nuevo participante")
    socketServer.emit("evento_para_todos", "Hay un nuevo participante, no olvidar las politicas....")

    socket.on("input-message", (data)=>{
        socketServer.emit("input-message", data)
    })

    socket.on("chat-message", (data)=>{
        const newMesagge = {
            socketId: socket.id,
            mesagge: data
        }
        messages = [...mesagges, newMesagge];
        socketServer.emit("chat-messages-update", mesagges)
    })
})


