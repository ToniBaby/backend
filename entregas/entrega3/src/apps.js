import express from 'express';
import ProductManager from './ProductManager.js'; // Asegúrate de que esta ruta sea correcta

const PORT = 8080;
const app = express();
const productManager = new ProductManager(); // Instancia de la clase ProductManager

productManager.initializeProducts();

app.get('/products', async (req, res) => {
  const limit = req.query.limit;
  let products;
  if (limit) {
    products = await productManager.getProducts(parseInt(limit));
  } else {
    products = await productManager.getProducts();
  }
  res.send({ products });
});

app.get('/products/:pid', async (req, res) => {
  const productId = req.params.pid;
  const product = await productManager.getProductById(productId);
  res.send({ product });
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
});