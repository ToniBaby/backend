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

createProducts = async (product)=>{
    const products = await this.getProducts();
    if(products.length === 0){
        product.id = 1;
    }else{
        product.id = products[products.length-1].id + 1 ;
    }

    products.push(product);
    await fs.promises.writeFile(this.path, JSON.stringify(products,null,'\t'))
    return products
}