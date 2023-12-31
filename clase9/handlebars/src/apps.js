import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import users from "./users.js";

const PORT = 8080;

const app = express();
// Inicializamos el motor indicando con app.engine({nombre del motor a utilizar}, {instancia del motor})
app.engine("handlebars", handlebars.engine());
/**
 * Con app.set({nombre de la variable}, {valor de la variable}) podemos configurar variables de la aplicación.
 * En este caso, configuramos la variable "views" para que apunte a la carpeta "views"
 */
app.set("views", __dirname + "/views");
/**
 * De igual manera, seteamos la variable "view engine" para que apunte al motor de plantillas que queremos utilizar.
 */
app.set("view engine", "handlebars");

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puertos: ${PORT}`);
})

app.get("/", (req,res)=>{
    const randonUser = users[Math.floor(Math.random() * users.length)]

    res.render("index", randonUser)
})