// Simulación de base de datos de productos
const productos = [
    {
        id: 1,
        nombre: "Torta de Chocolate",
        descripcion: "Deliciosa torta de chocolate con relleno de crema y cobertura de ganache.",
        precio: 15000,
        imagen: "img/torta-chocolate.jpg",
        categoria: "Tortas",
        tamano: "Grande"
    },
    {
        id: 2,
        nombre: "Cheesecake de Frutilla",
        descripcion: "Cremoso cheesecake con salsa de frutilla natural.",
        precio: 12000,
        imagen: "img/cheesecake-frutilla.jpg",
        categoria: "Cheesecakes",
        tamano: "Mediano"
    },
    {
        id: 3,
        nombre: "Pie de Limón",
        descripcion: "Pie de limón con base crocante y merengue suave.",
        precio: 10000,
        imagen: "img/pie-limon.jpg",
        categoria: "Pies",
        tamano: "Pequeño"
    }
    // Agrega más productos según sea necesario
];

// Variables globales para filtros
let productosFiltrados = [...productos];
let categoriaActual = 'all';
let tamanoFiltro = 'all';
let ordenActual = 'default';

// Cargar productos al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
    cargarCategorias();
    cargarTamanos();
    cargarOpcionesOrden();
    configurarEventListeners();
    cargarProductos();
});

// Configurar event listeners para filtros y botones
function configurarEventListeners() {
    document.getElementById('sort-select').addEventListener('change', function(e) {
        ordenActual = e.target.value;
        aplicarFiltros();
    });

    document.getElementById('size-filter').addEventListener('change', function(e) {
        tamanoFiltro = e.target.value;
        aplicarFiltros();
    });

    document.querySelector('.categories-container').addEventListener('click', function(e) {
        if (e.target.classList.contains('category-btn')) {
            categoriaActual = e.target.dataset.categoria;
            aplicarFiltros();
        }
    });
}

// Cargar productos en la cuadrícula
function cargarProductos() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    if (productosFiltrados.length === 0) {
        grid.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    productosFiltrados.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-detalle" data-id="${producto.id}" style="cursor:pointer;">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p><strong>Precio:</strong> $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        grid.appendChild(card);
    });

    // Agregar evento para ir a detalles al hacer click en la imagen
    document.querySelectorAll('.img-detalle').forEach(img => {
        img.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            window.location.href = `detalles.html?id=${id}`;
        });
    });
}

// Aplicar todos los filtros
function aplicarFiltros() {
    productosFiltrados = productos.filter(producto => {
        let categoriaOk = categoriaActual === 'all' || producto.categoria === categoriaActual;
        let tamanoOk = tamanoFiltro === 'all' || producto.tamano === tamanoFiltro;
        return categoriaOk && tamanoOk;
    });

    if (ordenActual === 'precio-asc') {
        productosFiltrados.sort((a, b) => a.precio - b.precio);
    } else if (ordenActual === 'precio-desc') {
        productosFiltrados.sort((a, b) => b.precio - a.precio);
    }

    cargarProductos();
}

// Cargar categorías dinámicamente
function cargarCategorias() {
    const categorias = ['all', ...new Set(productos.map(p => p.categoria))];
    const container = document.querySelector('.categories-container');
    container.innerHTML = '';
    categorias.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.dataset.categoria = cat;
        btn.textContent = cat === 'all' ? 'Todos' : cat;
        container.appendChild(btn);
    });
}

// Cargar tamaños dinámicamente
function cargarTamanos() {
    const tamanos = ['all', ...new Set(productos.map(p => p.tamano))];
    const select = document.getElementById('size-filter');
    select.innerHTML = '';
    tamanos.forEach(tam => {
        const option = document.createElement('option');
        option.value = tam;
        option.textContent = tam === 'all' ? 'Todos los tamaños' : tam;
        select.appendChild(option);
    });
}

// Cargar opciones de orden
function cargarOpcionesOrden() {
    const select = document.getElementById('sort-select');
    select.innerHTML = `
        <option value="default">Ordenar por</option>
        <option value="precio-asc">Precio: Menor a mayor</option>
        <option value="precio-desc">Precio: Mayor a menor</option>
    `;
}

// Función para agregar productos al carrito
function agregarAlCarrito(productId) {
    alert("Producto agregado al carrito: " + productId);
    // Aquí puedes implementar la lógica para agregar el producto al carrito//
}