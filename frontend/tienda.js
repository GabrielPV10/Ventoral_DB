const API_PRODUCTOS = 'http://localhost:3000/api/productos';
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

// 2. Cargar Productos del Backend
async function cargarProductos() {
    try {
        const res = await fetch(API_PRODUCTOS);
        todosLosProductos = await res.json(); // Guardamos los datos en la variable global
        
        // Mostramos todos al principio
        mostrarProductos(todosLosProductos);

    } catch (error) {
        console.error("Error:", error);
        productosContainer.innerHTML = '<p>Error al cargar el catálogo.</p>';
    }
}

// 3. Función para "Pintar" los productos en pantalla
function mostrarProductos(lista) {
    productosContainer.innerHTML = ''; // Limpiar contenido actual

    if(lista.length === 0) {
        productosContainer.innerHTML = '<p style="text-align:center; width:100%;">No hay productos en esta categoría.</p>';
        return;
    }

    lista.forEach(prod => {
        // Usar imagen por defecto si no tiene
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

// 4. Función de Filtrado (Llamada por los botones del HTML)
function filtrarProductos(categoriaId) {
    if (categoriaId === 'todos') {
        mostrarProductos(todosLosProductos);
    } else {
        // Filtramos la lista original usando el ID de categoría
        const filtrados = todosLosProductos.filter(p => p.categoria_id === categoriaId);
        mostrarProductos(filtrados);
    }
}

function agregarAlCarrito(id) {
    if (!usuarioLogueado) {
        alert("Por favor inicia sesión para comprar.");
        window.location.href = 'login.html';
        return;
    }
    alert(`Producto ID ${id} agregado (Simulación)`);
}

// Iniciar
cargarProductos();

// ... (El código anterior de cargar productos sigue igual) ...

// NUEVA LÓGICA DEL CARRITO

async function agregarAlCarrito(productoId) {
    // 1. Validar sesión
    if (!usuarioLogueado) {
        alert("Por favor inicia sesión para comprar.");
        window.location.href = 'login.html';
        return;
    }

    // 2. Enviar al Backend
    try {
        const res = await fetch('http://localhost:3000/api/carrito/agregar', {
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
            actualizarContadorCarrito(); // Actualizamos el número en el menú
        } else {
            alert("Error al agregar producto");
        }

    } catch (error) {
        console.error(error);
        alert("Error de conexión");
    }
}

// Función para actualizar el número en el menú
async function actualizarContadorCarrito() {
    if (!usuarioLogueado) return;

    try {
        const res = await fetch(`http://localhost:3000/api/carrito/${usuarioLogueado.id}`);
        const items = await res.json();
        
        // Sumar todas las cantidades
        const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0);
        
        // CAMBIO AQUÍ: Buscamos el botón por su clase y texto, o mejor aún, le ponemos un ID en el HTML
        const btnCarrito = document.querySelector('.btn-login'); 
        
        // Buscamos específicamente el botón que tiene el texto "Carrito" o el icono
        const botones = document.querySelectorAll('.btn-login');
        botones.forEach(btn => {
            if(btn.textContent.includes('Carrito')) {
                btn.textContent = `🛒 Carrito (${totalItems})`;
            }
        });

    } catch (error) {
        console.error("Error actualizando contador:", error);
    }
}
// Llamamos a esta función al cargar la página para ver si ya había cosas guardadas
actualizarContadorCarrito();