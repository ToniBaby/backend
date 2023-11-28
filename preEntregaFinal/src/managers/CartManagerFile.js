import fs from "fs";
import path from "path";    
import __dirname from "../utils.js"

class CartManagerFile {

    constructor(pathFile){
        this.path = path.join(__dirname,`/files/${pathFile}`);

    }
    getCarts = async ()=>{

        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const  carts = JSON.parse(data);
            return carts;

        }else{
            return[]
        }
    }

    createCarts = async (cart)=>{
        const carts = await this.getCarts();
        if(carts.length === 0){
            cart.id = 1;
        }else{
            cart.id = carts[carts.length-1].id + 1 ;
        }

        carts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts,null,'\t'))
        return carts
    }

    updateCart = async (cartId, updatedCart) => {
        const carts = await this.getCarts();
        const index = carts.findIndex(cart => cart.id === cartId);
        if (index === -1) {
            console.error('Carrito no encontrado');
            return null;
        }

        const updated = { ...carts[index], ...updatedCart };
        carts[index] = updated;

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));

        return updated;
    }

    deleteCart = async (cartId) => {
        const carts = await this.getCarts();
        const index = carts.findIndex(cart => cart.id === cartId);
        if (index === -1) {
            console.error('Carrito no encontrado');
            return null;
        }

        const deletedCart = carts.splice(index, 1)[0];

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));

        return deletedCart;
    }
}

export {CartManagerFile};