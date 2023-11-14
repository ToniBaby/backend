import fs from 'fs';

const path = './files/Usuarios.json'

export default class ManagersUsuarios{

    consultarUsuarios = async ()=>{

        if(fs.existsSync(path)){
            const data = await fs.promises.readFile(path , 'utf-8');
            const users = JSON.parse(data);
            return users
        }else{
            return [];
        }

    }

    crearUsuario = async (usuario) =>{
        const users = await this.consultarUsuarios();
        if(users.length === 0){
            usuario.id = 1
        }else{
            usuario.id = users[users.length-1].id+1; //users.length-1 me da el ultimo usuaior que existe me das el id y dps le sumo 1
        }
        users.push(usuario);
        await fs.promises.writeFile(path, JSON.stringify(users, null, '\t'))
        return users;


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