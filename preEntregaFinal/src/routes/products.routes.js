 import {Router} from "express";
 import {ProductManagerFile} from  "../managers/ProductManagerFile.js";

 const path = "products.json";
 const router = Router();
 const productManagerFile = new ProductManagerFile(path);

 router.get('/', async (req,res)=>{

    const products = await productManagerFile.getProducts()

    res.send({
        status: "success",
        productos: products
     })
 })
 router.get('/:pid', async (req,res)=>{
    const pid = req.params.pid;

    res.send({
        status: "success", 
        msg: `Ruta GET ID PRODUCTs con ID: ${pid}`
     })
 })
 router.post('/', async (req,res)=>{ //creacion

    const product = req.body; //Json con el producto 

    const products = await productManagerFile.createProducts(product);

    res.send({
        status: "success",
        msg: "Producto creado",
        productos: products
     })
 })

 router.post('/:pid/add-to-cart/:cid', async (req, res) => {
    const pid = req.params.pid; 
    const cid = req.params.cid; 

   

    res.send({
        status: "success",
        message: `Agregado producto con ID ${pid} al carrito con ID ${cid}`
    });
});

router.put('/:pid', async (req,res)=>{
    const pid = req.params.pid;
 
    res.send({
        status: "success",
        msg: `Ruta PUT de PRODUCTS con ID: ${pid}`
     })
 })

 router.delete('/:pid', async (req,res)=>{
    const pid = req.params.pid;
   
    res.send({
        status: "success",
        msg: `Ruta DELETE de PRODUCTS con ID: ${pid}`
     })
 })

 export {router as productRouter};
  