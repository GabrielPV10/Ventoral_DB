const API_URL = 'http://localhost:3000/api/productos';
const form = document.getElementById('productoForm');
const tableBody = document.getElementById('tablaProductos');

// 1. CARGAR PRODUCTOS (READ)
async function cargarProductos() {
    try {
        const res = await fetch(API_URL);
        const productos = await res.json();

        tableBody.innerHTML = '';

        productos.forEach(prod => {
            const imgUrl = prod.imagen_url || 'https://via.placeholder.com/50';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${imgUrl}" class="preview" alt="img"></td>
                <td>${prod.sku || 'N/A'}</td>
                <td>${prod.nombre}</td>
                <td>$${parseFloat(prod.precio).toFixed(2)}</td>
                <td>${prod.stock}</td>
                <td>
                    <button class="btn-edit" onclick="llenarFormulario(${prod.id})">Editar</button>
                    <button class="btn-delete" onclick="eliminarProducto(${prod.id})">Borrar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error cargando productos:", error);
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:red;">Error al conectar con la API</td></tr>';
    }
}

// 2. GUARDAR PRODUCTO (CREATE / UPDATE)
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('productoId').value;
    const datos = {
        nombre: document.getElementById('nombre').value,
        sku: document.getElementById('sku').value,
        categoria_id: document.getElementById('categoria_id').value,
        precio: document.getElementById('precio').value,
        stock: document.getElementById('stock').value,
        imagen_url: document.getElementById('imagen_url').value,
        descripcion: document.getElementById('descripcion').value
    };

    try {
        let res;
        if (id) {
            // UPDATE (PATCH)
            res = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
        } else {
            // CREATE (POST)
            res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
        }

        if (res.ok) {
            alert(id ? 'Producto actualizado' : 'Producto creado');
            resetForm();
            cargarProductos();
        } else {
            const err = await res.json();
            alert('Error: ' + err.message);
        }

    } catch (error) {
        console.error(error);
        alert('Error de conexión');
    }
});

// 3. ELIMINAR PRODUCTO (DELETE)
async function eliminarProducto(id) {
    if (!confirm('¿Seguro que quieres borrar este producto?')) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) {
            cargarProductos();
        } else {
            alert('No se pudo eliminar');
        }
    } catch (error) {
        console.error(error);
    }
}

// 4. LLENAR FORMULARIO (Para editar)
async function llenarFormulario(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const prod = await res.json();

    document.getElementById('productoId').value = prod.id;
    document.getElementById('nombre').value = prod.nombre;
    document.getElementById('sku').value = prod.sku;
    document.getElementById('categoria_id').value = prod.categoria_id;
    document.getElementById('precio').value = prod.precio;
    document.getElementById('stock').value = prod.stock;
    document.getElementById('imagen_url').value = prod.imagen_url;
    document.getElementById('descripcion').value = prod.descripcion;

    document.getElementById('form-title').innerText = "Editar Producto";
    document.getElementById('btn-guardar').innerText = "Actualizar";
    document.getElementById('btn-cancelar').style.display = "inline-block";
    
    // Scroll hacia arriba para ver el formulario
    window.scrollTo(0,0);
}

function resetForm() {
    form.reset();
    document.getElementById('productoId').value = '';
    document.getElementById('form-title').innerText = "Agregar Nuevo Producto";
    document.getElementById('btn-guardar').innerText = "Guardar Producto";
    document.getElementById('btn-cancelar').style.display = "none";
}

document.getElementById('btn-cancelar').addEventListener('click', resetForm);

// Iniciar
cargarProductos();