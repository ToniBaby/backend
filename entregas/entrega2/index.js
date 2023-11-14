import ProductManager from './manager/ProductsManagers.js';

const productManager = new ProductManager();


async function testProductManager() {
    
    await productManager.addProduct('Producto 1', 'Descripción del producto 1', 100, 'imagen1.jpg', 'A1', 10);

    
    const products = await productManager.getProducts();
    console.log('Productos:', products);

   
    const productById = await productManager.getProductById(1);
    console.log('Producto por ID:', productById);

   
    const updatedProduct = await productManager.updateProduct(1, { price: 150 });
    console.log('Producto actualizado:', updatedProduct);

   
    const deletedProduct = await productManager.deleteProduct(2);
    console.log('Producto eliminado:', deletedProduct);

   
    const updatedProducts = await productManager.getProducts();
    console.log('Productos actualizados:', updatedProducts);
}


testProductManager();