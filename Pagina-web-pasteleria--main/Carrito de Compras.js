// Ejemplo de cómo añadir un producto al carrito
function addToCart(productId, quantity = 1, size = 'mediano', message = '') {
    const cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.id === productId && item.size === size && item.message === message);
    
    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            id: productId,
            quantity: quantity,
            size: size,
            message: message,
            addedAt: new Date().toISOString()
        });
    }
    
    saveCart(cart);
    alert('Producto añadido al carrito!');
}

// Función para obtener el carrito
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Función para guardar el carrito
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(element => {
        element.textContent = `(${totalItems})`;
    });
}