import express from "express";

import handlebars from "express-handlebars";

import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";


 

const PORT = 8080;

const app = express();

app.use(express.static(__dirname + "/../public"))

 

app.engine("handlebars",handlebars.engine())

//app.engine("handlebars",engine())

 

app.set("view engine", "handlebars");

app.set("views", __dirname + "/views");

 

app.listen(PORT, ()=>{

    console.log(`Servidor funcionando en el puerto: ${PORT}`);

})

app.use("/", viewsRouter);

app.get("/foods", (req,res)=>{
    const foods = [

        { name: "Manzana", price: 20 },
    
        { name: "Banana", price: 10 },
    
        { name: "Pera", price: 5 },
    
        { name: "Frutilla", price: 30 },
    
      ];
      const user = {
        firstname: "Franco",
        lastname: "Jalil",
        isAdmin: true
      }

      res.render("foods", {foods, isAdmin: user.isAdmin})
        
      
})