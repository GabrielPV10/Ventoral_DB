const tableBody = document.getElementById('cartBody');
const totalPriceElement = document.getElementById('totalPrice');

// 1. Verificar Sesión
const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));

if (!usuarioLogueado) {
    alert("Debes iniciar sesión para ver tu carrito");
    window.location.href = 'login.html';
}

// 2. Cargar Items del Carrito
async function cargarCarrito() {
    try {
        const res = await fetch(`http://localhost:3000/api/carrito/${usuarioLogueado.id}`);
        const items = await res.json();

        renderizarCarrito(items);

    } catch (error) {
        console.error(error);
        tableBody.innerHTML = '<tr><td colspan="4">Error al cargar el carrito</td></tr>';
    }
}

// 3. Dibujar en HTML (ACTUALIZADO CON BOTÓN ELIMINAR)
function renderizarCarrito(items) {
    const tableHead = document.querySelector('#cartTable thead tr');
    
    // Asegurarnos que la cabecera tenga la columna "Acción"
    if (!tableHead.innerHTML.includes('Acción')) {
        tableHead.innerHTML += '<th>Acción</th>';
    }

    tableBody.innerHTML = '';
    let total = 0;

    if (items.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Tu carrito está vacío 😢</td></tr>';
        totalPriceElement.innerText = '$0.00';
        return;
    }

    items.forEach(item => {
        const subtotal = parseFloat(item.subtotal);
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="display: flex; align-items: center; gap: 10px;">
                <img src="${item.imagen_url || 'https://via.placeholder.com/50'}" class="cart-img">
                <span>${item.nombre}</span>
            </td>
            <td>$${parseFloat(item.precio).toFixed(2)}</td>
            <td>${item.cantidad}</td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <button onclick="eliminarItem(${item.item_id})" style="background:#c0392b; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">
                    🗑️
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    totalPriceElement.innerText = `$${total.toFixed(2)}`;
}

// NUEVA FUNCIÓN PARA ELIMINAR DESDE EL FRONTEND
async function eliminarItem(itemId) {
    if(!confirm("¿Quitar este producto?")) return;

    try {
        const res = await fetch(`http://localhost:3000/api/carrito/item/${itemId}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            cargarCarrito(); // Recargar la tabla para ver los cambios
            // Opcional: actualizar el contador si estuviéramos en la tienda principal
        } else {
            alert("Error al eliminar");
        }
    } catch (error) {
        console.error(error);
    }
}
// Iniciar
cargarCarrito();