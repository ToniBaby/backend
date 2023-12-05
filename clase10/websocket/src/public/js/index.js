//Iniciar el Socket

const socket = io();

socket.emit("message", "Mensaje desde el front"); 

socket.on("evento_para_mi", data=>{
    console.log(data);
}) 
socket.on("evento_no_para_mi", data=>{
    console.log(data);
}) 
socket.on("evento_para_todos", data=>{
    console.log(data);
}) 

const chatInput = document.getElementById("chat-input");
/********************* */
chatInput.addEventListener("input", function(ev){
    socket.emit("input-message", ev.target.value)
})

const inputMesagge = document.getElementById("input-message");
socket.on("input-mesagge", (data)=>{
    inputMesagge.innerText = data ;
})
/******************* */

const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", function(ev){
    socket.emit("chat-mesagge", chatInput.value);
})

const chatMesagges = document.getElementById("chat-messages");
socket.on("chat-message-update", (data)=>{
    chatMesagges.innerHTML = "";
    for(const el of data){
        const li = document.createElement("li");
        li.innerText = `${el.socketId}: ${el.message}`;
        chatMesagges.appendChild(li)
    }
})