import fs from "fs";
import path from "path";    
import __dirname from "../utils.js"

class ProductManagerFile {

    constructor(pathFile){
        this.path = path.join(__dirname,`/files/${pathFile}`);

    }
 

    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            let products = JSON.parse(data);
    
            const requiredFields = ["title", "description", "code", "price", "status", "stock", "category", "thumbnails"];
    
           
            products = products.map(product => {
                requiredFields.forEach(field => {
                    if (!product.hasOwnProperty(field)) {
                        product[field] = ''; 
                    }
                });
                return product;
            });
    
            return products;
        } else {
            return [];
        }
    }
    

    createProducts = async (product) => {
        try {
            const products = await this.getProducts();
    
            
            const requiredFields = ["title", "description", "code", "price", "status", "stock", "category"];
            for (const field of requiredFields) {
                if (!product[field]) {
                    throw new Error(`El campo ${field} es obligatorio.`);
                }
            }
    
           
            if (products.length === 0) {
                product.id = 1;
            } else {
                product.id = products[products.length - 1].id + 1;
            }
    
          
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            
            return { status: 201, message: 'Producto creado correctamente', producto: product };
        } catch (error) {
            return { status: 400, message: 'Error al crear el producto', error: error.message };
        }
    }
    

    updateProduct = async (id, newData) => {
        try {
            const products = await this.getProducts();
            const index = products.findIndex(product => product.id === id);
    
            if (index === -1) {
                throw new Error('Producto no encontrado');
            }
    
            const requiredFields = ["title", "description", "code", "price", "status", "stock", "category", "thumbnails"];
            for (const field of requiredFields) {
                if (!(field in newData)) {
                    throw new Error(`El campo ${field} es obligatorio para actualizar.`);
                }
            }
    
            products[index] = newData;
    
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
    
            return products[index];
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }
    

    deleteProduct = async (productId) => {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === productId);
    
        if (index === -1) {
            console.error('Producto no encontrado');
            return null;
        }
    
        const deletedProduct = products.splice(index, 1)[0];
    
       await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
    
        return deletedProduct;
    }
    
    
}


export {ProductManagerFile};