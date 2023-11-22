import http, { request } from "http";

 

const PORT = 8080;

 

const server = http.createServer( (request, response) =>{

 

    response.end('Mi primer hora mundo desde el Backend.');

})

 

server.listen(PORT, ()=>{

    console.log(`Servidor funcionando en el puerto: ${PORT}`);

})