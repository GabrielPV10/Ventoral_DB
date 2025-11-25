const form = document.getElementById('checkoutForm');
const totalElement = document.getElementById('totalAmount');
const metodoSelect = document.getElementById('metodo_pago');
const refGroup = document.getElementById('refGroup');

const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
if (!usuarioLogueado) {
    window.location.href = 'login.html';
}

if(usuarioLogueado.direccion_default) {
    document.getElementById('direccion').value = usuarioLogueado.direccion_default;
}

let totalCalculado = 0;

async function calcularTotal() {
    try {
        const res = await fetch(`http://localhost:3000/api/carrito/${usuarioLogueado.id}`);
        const items = await res.json();
        
        if(items.length === 0) {
            alert("Tu carrito está vacío");
            window.location.href = 'index.html';
            return;
        }

        // Sumar subtotales
        totalCalculado = items.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);
        totalElement.innerText = `$${totalCalculado.toFixed(2)}`;

    } catch (error) {
        console.error("Error calculando total", error);
    }
}

// Mostrar campo de referencia según método
metodoSelect.addEventListener('change', (e) => {
    if(e.target.value === 'efectivo') {
        refGroup.style.display = 'none';
    } else {
        refGroup.style.display = 'block';
    }
});

// 3. Procesar Compra
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const datosCompra = {
        cliente_id: usuarioLogueado.id,
        direccion_envio: document.getElementById('direccion').value,
        metodo_pago: document.getElementById('metodo_pago').value,
        total: totalCalculado,
        // Si es efectivo, generamos una referencia automática, si no, lo que escriba el usuario
        referencia: document.getElementById('referencia').value || `REF-${Date.now()}` 
    };

    try {
        const res = await fetch('http://localhost:3000/api/ordenes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosCompra)
        });

        const data = await res.json();

        if (res.ok) {
            alert(`¡Compra Exitosa!\nOrden ID: ${data.orden_id}\nGracias por tu compra.`);
            window.location.href = 'index.html';
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        console.error(error);
        alert("Error de conexión");
    }
});

// Iniciar
calcularTotal();