// Datos de productos (simulando una base de datos)
const productos = [
    {
        id: 1,
        nombre: "Torta de Chocolate Clásica",
        precio: 19990,
        descripcion: "Deliciosa torta de chocolate con relleno de crema y cubierta de ganache.",
        imagen: "img/productos/torta-chocolate.jpg",
        categoria: "tortas-circulares",
        tamaño: ["pequeno", "mediano", "grande"],
        destacado: true
    },
    {
        id: 2,
        nombre: "Torta de Vainilla con Frutas",
        precio: 21990,
        descripcion: "Esponjosa torta de vainilla decorada con frutas frescas de la estación.",
        imagen: "img/productos/torta-vainilla-frutas.jpg",
        categoria: "tortas-circulares",
        tamaño: ["pequeno", "mediano", "grande"],
        destacado: true
    },
    {
        id: 3,
        nombre: "Cheesecake de Frutilla",
        precio: 17990,
        descripcion: "Suave cheesecake con base de galleta y topping de frutillas frescas.",
        imagen: "img/productos/cheesecake-frutilla.jpg",
        categoria: "tortas-cuadradas",
        tamaño: ["pequeno", "mediano"],
        destacado: true
    },
    {
        id: 4,
        nombre: "Torta Tres Leches",
        precio: 15990,
        descripcion: "Clásica torta bañada en mezcla de tres leches y decorada con merengue.",
        imagen: "img/productos/torta-tres-leches.jpg",
        categoria: "tortas-cuadradas",
        tamaño: ["pequeno", "mediano", "grande"],
        destacado: false
    },
    {
        id: 5,
        nombre: "Postre Tiramisú",
        precio: 8990,
        descripcion: "Clásico postre italiano con capas de bizcocho de soletilla, café y crema de mascarpone.",
        imagen: "img/productos/tiramisu.jpg",
        categoria: "postres-individuales",
        tamaño: ["individual"],
        destacado: true
    },
    {
        id: 6,
        nombre: "Torta de Zanahoria Sin Azúcar",
        precio: 22990,
        descripcion: "Torta de zanahoria elaborada con endulzantes naturales, ideal para diabéticos.",
        imagen: "img/productos/torta-zanahoria-sin-azucar.jpg",
        categoria: "sin-azucar",
        tamaño: ["pequeno", "mediano"],
        destacado: false
    },
    {
        id: 7,
        nombre: "Brazo de Reina",
        precio: 12990,
        descripcion: "Tradicional brazo de reina con relleno de manjar y cubierto de merengue.",
        imagen: "img/productos/brazo-reina.jpg",
        categoria: "tradicional",
        tamaño: ["mediano"],
        destacado: false
    },
    {
        id: 8,
        nombre: "Torta de Chocolate Sin Gluten",
        precio: 23990,
        descripcion: "Torta de chocolate elaborada con harinas alternativas para celíacos.",
        imagen: "img/productos/torta-chocolate-sin-gluten.jpg",
        categoria: "sin-gluten",
        tamaño: ["pequeno", "mediano"],
        destacado: true
    },
    {
        id: 9,
        nombre: "Torta Vegana de Chocolate",
        precio: 24990,
        descripcion: "Torta de chocolate elaborada sin productos de origen animal.",
        imagen: "img/productos/torta-vegana-chocolate.jpg",
        categoria: "vegana",
        tamaño: ["pequeno", "mediano"],
        destacado: false
    },
    {
        id: 10,
        nombre: "Torta Personalizada Cumpleaños",
        precio: 29990,
        descripcion: "Torta especial para cumpleaños con decoración personalizada.",
        imagen: "img/productos/torta-cumpleanos.jpg",
        categoria: "especiales",
        tamaño: ["mediano", "grande"],
        destacado: false
    }
];

// Función para cargar productos en la página
function cargarProductos(productosFiltrados = productos) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    if (productosFiltrados.length === 0) {
        productsGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <h3>No se encontraron productos</h3>
                <p>Intenta con otros filtros o categorías</p>
            </div>
        `;
        return;
    }

    productosFiltrados.forEach(producto => {
        const productCard = `
            <div class="col-md-4 col-lg-3 mb-4">
                <div class="card product-card h-100">
                    <div class="product-image">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="product-title">${producto.nombre}</h5>
                        <p class="product-price">$${producto.precio.toLocaleString('es-CL')}</p>
                        <p class="product-description flex-grow-1">${producto.descripcion}</p>
                        <div class="mt-auto">
                            <a href="detalle-producto.html?id=${producto.id}" class="btn btn-primary w-100 add-to-cart-btn">Ver Detalles</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productsGrid.innerHTML += productCard;
    });
}

// Función para filtrar productos por categoría
function filtrarPorCategoria(categoria) {
    if (categoria === 'all') {
        cargarProductos();
        return;
    }

    const productosFiltrados = productos.filter(producto => producto.categoria === categoria);
    cargarProductos(productosFiltrados);
}

// Función para ordenar productos
function ordenarProductos(criterio, productosParaOrdenar = productos) {
    let productosOrdenados = [...productosParaOrdenar];

    switch (criterio) {
        case 'price-asc':
            productosOrdenados.sort((a, b) => a.precio - b.precio);
            break;
        case 'price-desc':
            productosOrdenados.sort((a, b) => b.precio - a.precio);
            break;
        case 'name':
            productosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        default:
            // Orden por defecto (sin cambios)
            break;
    }

    return productosOrdenados;
}

// Función para filtrar por tamaño
function filtrarPorTamaño(tamaño, productosParaFiltrar = productos) {
    if (tamaño === 'all') {
        return productosParaFiltrar;
    }

    return productosParaFiltrar.filter(producto => 
        producto.tamaño.includes(tamaño)
    );
}

// Función para manejar los filtros combinados
function aplicarFiltros() {
    const categoriaActiva = document.querySelector('.category-btn.active')?.dataset.category || 'all';
    const ordenSeleccionado = document.getElementById('sort-select').value;
    const tamañoSeleccionado = document.getElementById('size-filter').value;

    let productosFiltrados = productos;

    // Filtrar por categoría
    if (categoriaActiva !== 'all') {
        productosFiltrados = productosFiltrados.filter(producto => producto.categoria === categoriaActiva);
    }

    // Filtrar por tamaño
    productosFiltrados = filtrarPorTamaño(tamañoSeleccionado, productosFiltrados);

    // Ordenar
    productosFiltrados = ordenarProductos(ordenSeleccionado, productosFiltrados);

    // Cargar productos filtrados
    cargarProductos(productosFiltrados);
}

// Cargar productos destacados en la página de inicio
function cargarProductosDestacados() {
    const featuredProducts = document.getElementById('featured-products');
    if (!featuredProducts) return;

    const productosDestacados = productos.filter(producto => producto.destacado);
    
    productosDestacados.forEach(producto => {
        const productCard = `
            <div class="col-md-4 col-lg-3 mb-4">
                <div class="card product-card h-100">
                    <div class="product-image">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="product-title">${producto.nombre}</h5>
                        <p class="product-price">$${producto.precio.toLocaleString('es-CL')}</p>
                        <p class="product-description flex-grow-1">${producto.descripcion}</p>
                        <div class="mt-auto">
                            <a href="detalle-producto.html?id=${producto.id}" class="btn btn-primary w-100 add-to-cart-btn">Ver Detalles</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        featuredProducts.innerHTML += productCard;
    });
}

// Inicializar la página de productos
document.addEventListener('DOMContentLoaded', function() {
    // Si estamos en la página de productos
    if (document.getElementById('products-grid')) {
        // Cargar todos los productos inicialmente
        cargarProductos();

        // Event listeners para los botones de categoría
        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', function() {
                // Remover clase active de todos los botones
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Agregar clase active al botón clickeado
                this.classList.add('active');
                
                // Aplicar filtros
                aplicarFiltros();
            });
        });

        // Event listeners para los selectores de orden y filtro
        document.getElementById('sort-select').addEventListener('change', aplicarFiltros);
        document.getElementById('size-filter').addEventListener('change', aplicarFiltros);
    }

    // Si estamos en la página de inicio, cargar productos destacados
    if (document.getElementById('featured-products')) {
        cargarProductosDestacados();
    }

    // Manejar parámetros de URL para filtrado desde la página de inicio
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaURL = urlParams.get('categoria');
    
    if (categoriaURL && document.querySelector(`.category-btn[data-category="${categoriaURL}"]`)) {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const categoriaBtn = document.querySelector(`.category-btn[data-category="${categoriaURL}"]`);
        if (categoriaBtn) {
            categoriaBtn.classList.add('active');
            filtrarPorCategoria(categoriaURL);
        }
    }
});