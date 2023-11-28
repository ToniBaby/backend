import express from "express";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import originalDirname from "./utils.js";


const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(`${originalDirname}/public`))



const server = app.listen(PORT, ()=>{
    console.log(`El servidor funciona en el puerto: ${PORT}`);
})

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
