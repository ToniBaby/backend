import {Router} from "express";
import {CartManagerFile} from  "../managers/CartManagerFile.js";
import {socket} from "../public/js/index.js"

const path = "carts.json";
const router = Router();
const cartManagerFile = new CartManagerFile(path);

router.get('/', async (req,res)=>{

    const carts = await cartManagerFile.getCarts()

    res.send({
        status: "success",
        carritos: carts
     })

 
})
router.get('/:cid', async (req,res)=>{
    const cid = req.params.cid;

   res.send({
       status: "success",
       msg: `Ruta GET ID CARTS con ID: ${cid}`
    })
})
router.post('/', async (req,res)=>{ //creacion

    const cart = req.body; //Json con el producto 

    const carts = await cartManagerFile.createCarts(cart);

    // Emitir un evento 'cartCreated' cuando se crea un carrito
    socket.emit('cartCreated', cart);

   res.send({
       status: "success",
       msg: "Carrito creado",
       carritos: carts
    })
})
router.post('/:cid/product/:pid', async (req,res)=>{ //creacion
    const cid = req.params.cid;
    const pid = req.params.pid;
   res.send({
       status: "success",
       msg: `Ruta POST CARTS - Agrego producto al carrito. CID: ${cid} PID: ${pid}`
    })
})
router.put('/:cid', async (req,res)=>{
   const cid = req.params.cid;

   res.send({
       status: "success",
       msg: `Ruta PUT de CARTS con ID: ${cid}`
    })
})
router.delete('/:cid', async (req,res)=>{
   const cid = req.params.cid;
  
   res.send({
       status: "success",
       msg: `Ruta DELETE de CARTS con ID: ${cid}`
    })
})

export {router as cartRouter};
 