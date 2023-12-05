 import {Router} from "express";
 import {ProductManagerFile} from  "../managers/ProductManagerFile.js";

 const path = "products.json";
 const router = Router();
 const productManagerFile = new ProductManagerFile(path);

 router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const products = await productManagerFile.getProducts();
      
        let limitedProducts = products;
        if (!isNaN(limit)) {
            limitedProducts = products.slice(0, limit);
        }
        
        res.status(200).send({
            status: "success",
            productos: limitedProducts
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: 'Error',
            error: error.message
        });
    }
});

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

router.put('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const newData = req.body;

        const updatedProduct = await productManagerFile.updateProduct(productId, newData);

        if (!updatedProduct) {
            res.status(404).send({
                status: 'error',
                message: 'Producto no encontrado'
            });
        } else {
            res.status(200).send({
                status: 'success',
                message: 'Producto actualizado correctamente',
                producto: updatedProduct
            });
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: 'Producto no encontrado',
            error: error.message
        });
    }
});


router.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);

        const deletedProduct = await productManagerFile.deleteProduct(productId);

        if (!deletedProduct) {
            res.status(404).send({
                status: 'error',
                message: 'Producto no encontrado'
            });
        } else {
            res.status(200).send({
                status: 'success',
                message: 'Producto eliminado correctamente',
                deletedProduct: deletedProduct
            });
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: 'Error',
            error: error.message
        });
    }
});



 export {router as productRouter};
  