import fs from 'fs';

export default class ProductManager {
    constructor() {
        this.path = './files/productos.json'; 
    }
    
   
    addProduct = async (title, description, price, thumbnail, code, stock) => {
      const products = await this.getProducts();
  
      let id = 1;
      if (products.length > 0) {
          id = products[products.length - 1].id + 1;
      }
  
      const product = {
          id,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
      };
  
      products.push(product);
  
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
  
      return products;
  }

  getProducts = async () => {
      try {
          const data = await fs.promises.readFile(this.path, 'utf-8');
          return JSON.parse(data) || [];
      } catch (error) {
          console.error('Error al obtener los productos:', error);
          return [];
      }
  }
  getProductById = async (id) => {
    const products = await this.getProducts();
    const product = products.find(product => product.id === id);
    if (!product) {
        console.error('Producto no encontrado');
        return null;
    }
    return product;
}

updateProduct = async (id, newData) => {
    const products = await this.getProducts();
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
        console.error('Producto no encontrado');
        return null;
    }
    const updatedProduct = { ...products[index], ...newData };
    products[index] = updatedProduct;

    await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

    return updatedProduct;
}

deleteProduct = async (id) => {
    const products = await this.getProducts();
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
        console.error('Producto no encontrado');
        return null;
    }
    const deletedProduct = products.splice(index, 1)[0];

    await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

    return deletedProduct;
}
}
