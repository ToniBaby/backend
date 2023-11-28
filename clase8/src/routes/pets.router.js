import {Router} from "express";
import { uploader } from "../utils.js";

const router = Router();

const pets = [];

router.get('/', (req,res)=>{
    res.send({pets});
})

router.post('/',uploader.single('thumbnail'), (req,res)=>{

    const filename = req.file.filename ;

    if(!filename){
        return res.send({
            status:"error",
            error: "No se pudo cargar la imagen"
        
        })
    } 

    const pet = req.body;

    pet.thumbnail = `http://localhost:8080/images/${filename}`;

    pets.push(pet);
    res.send({
        status: "success",
        msg: pets
    })
})

export default router;

