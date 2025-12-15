const API_PRODUCTOS = '/api/productos';
const productosContainer = document.getElementById('productosContainer');
const userMenu = document.getElementById('userMenu');

// Variable para guardar la lista original completa
let todosLosProductos = []; 

// 1. Verificar Sesión
const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));

if (usuarioLogueado) {
    userMenu.innerHTML = `
        <span>Hola, ${usuarioLogueado.nombre}</span>
        <a href="#" onclick="cerrarSesion()" style="color: red; margin-right: 10px;">Salir</a>
        <a href="carrito.html" class="btn-login">🛒 Carrito (0)</a>
    `;
}

function cerrarSesion() {
    localStorage.removeItem('usuario');
    window.location.reload();
}

async function cargarProductos() {
    try {
        const res = await fetch(API_PRODUCTOS);
        todosLosProductos = await res.json();
        mostrarProductos(todosLosProductos);

    } catch (error) {
        console.error("Error:", error);
        productosContainer.innerHTML = '<p>Error al cargar el catálogo.</p>';
    }
}

function mostrarProductos(lista) {
    productosContainer.innerHTML = '';

    if(lista.length === 0) {
        productosContainer.innerHTML = '<p style="text-align:center; width:100%;">No hay productos en esta categoría.</p>';
        return;
    }

    lista.forEach(prod => {
        const imagen = prod.imagen_url || 'https://via.placeholder.com/300x300?text=Producto';

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${imagen}" alt="${prod.nombre}" class="product-img">
            <div class="product-info">
                <div class="product-title">${prod.nombre}</div>
                <div class="product-price">$${parseFloat(prod.precio).toFixed(2)}</div>
                <button class="btn-add" onclick="agregarAlCarrito(${prod.id})">
                    Añadir al carro
                </button>
            </div>
        `;
        productosContainer.appendChild(card);
    });
}

function filtrarProductos(categoriaId) {
    if (categoriaId === 'todos') {
        mostrarProductos(todosLosProductos);
    } else {
        const filtrados = todosLosProductos.filter(p => p.categoria_id === categoriaId);
        mostrarProductos(filtrados);
    }
}

// FUNCION REAL (Conectada al Backend - ÚNICA VERSIÓN)
async function agregarAlCarrito(productoId) {
    if (!usuarioLogueado) {
        alert("Por favor inicia sesión para comprar.");
        window.location.href = 'login.html';
        return;
    }

    try {
        // Ruta relativa correcta
        const res = await fetch('/api/carrito/agregar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                cliente_id: usuarioLogueado.id,
                producto_id: productoId,
                cantidad: 1
            })
        });

        if (res.ok) {
            alert("¡Producto agregado!");
            actualizarContadorCarrito();
        } else {
            alert("Error al agregar producto");
        }

    } catch (error) {
        console.error(error);
        alert("Error de conexión");
    }
}

async function actualizarContadorCarrito() {
    if (!usuarioLogueado) return;

    try {
        // Ruta relativa correcta
        const res = await fetch(`/api/carrito/${usuarioLogueado.id}`);
        const items = await res.json();
        
        const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0);
        
        const botones = document.querySelectorAll('.btn-login');
        
        botones.forEach(btn => {
            if(btn.innerText.includes('Carrito')) {
                btn.innerText = `🛒 Carrito (${totalItems})`;
            }
        });

    } catch (error) {
        console.error("Error actualizando contador");
    }
}

// Iniciar carga
cargarProductos();
actualizarContadorCarrito();