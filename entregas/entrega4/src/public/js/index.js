// Inicialización del Socket

const socket = io();

// Evento para agregar un producto al servidor
const productForm = document.getElementById('product-form');
productForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('product-title').value;
  const price = document.getElementById('product-price').value;

  // Emite un evento 'addProduct' con los detalles del nuevo producto al servidor
  socket.emit('addProduct', { title, price });

  // Limpia los campos del formulario después de enviar el producto
  document.getElementById('product-title').value = '';
  document.getElementById('product-price').value = '';
});

// Escucha el evento 'productAdded' para actualizar la lista de productos
socket.on('productAdded', (newProduct) => {
  const productList = document.getElementById('product-list');
  const listItem = document.createElement('li');
  listItem.textContent = `${newProduct.title} - ${newProduct.price}`;
  productList.appendChild(listItem);
});

// Escucha el evento 'productDeleted' para eliminar un producto de la lista
socket.on('productDeleted', (deletedProduct) => {
  const productList = document.getElementById('product-list');
  const items = productList.getElementsByTagName('li');
  Array.from(items).forEach((item) => {
    if (item.textContent.includes(deletedProduct.title)) {
      item.remove();
    }
  });
});

