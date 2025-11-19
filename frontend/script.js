const API_URL = 'http://localhost:3000/api/clientes';
const form = document.getElementById('clienteForm');
const tableBody = document.querySelector('#clientesTable tbody');

// 1. FUNCIÓN PARA OBTENER Y MOSTRAR CLIENTES (READ)
async function cargarClientes() {
    try {
        const res = await fetch(API_URL); // Hace la petición GET
        const clientes = await res.json();
        
        tableBody.innerHTML = ''; // Limpiar tabla antes de recargar
        
        clientes.forEach(cliente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cliente.id}</td>
                <td>${cliente.nombre_completo}</td>
                <td>${cliente.email}</td>
                <td>${cliente.telefono || 'N/A'}</td>
                <td>
                    <button class="btn-edit" onclick="llenarFormulario(${cliente.id})">Editar</button>
                    <button class="btn-delete" onclick="eliminarCliente(${cliente.id})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error cargando clientes:", error);
    }
}

// 2. FUNCIÓN PARA GUARDAR (CREATE o UPDATE)
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Capturar datos del formulario
    const id = document.getElementById('clienteId').value;
    const datosCliente = {
        nombre_completo: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        telefono: document.getElementById('telefono').value,
        direccion_default: document.getElementById('direccion').value
    };

    try {
        let res;
        if (id) {
            // Si hay ID, es una ACTUALIZACIÓN (PATCH)
            res = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosCliente)
            });
        } else {
            // Si NO hay ID, es un REGISTRO NUEVO (POST)
            res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosCliente)
            });
        }

        if (res.ok) {
            alert(id ? 'Cliente actualizado' : 'Cliente registrado');
            form.reset(); // Limpiar formulario
            document.getElementById('clienteId').value = ''; // Limpiar ID oculto
            document.getElementById('btn-guardar').innerText = 'Guardar Cliente';
            document.getElementById('btn-cancelar').style.display = 'none';
            cargarClientes(); // Recargar la lista
        } else {
            const error = await res.json();
            alert('Error: ' + error.message);
        }
    } catch (error) {
        console.error("Error guardando:", error);
    }
});

// 3. FUNCIÓN PARA ELIMINAR (DELETE)
async function eliminarCliente(id) {
    if (!confirm('¿Estás seguro de eliminar este cliente?')) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (res.ok || res.status === 204) {
            cargarClientes(); // Recargar la lista
        } else {
            alert('Error al eliminar');
        }
    } catch (error) {
        console.error("Error eliminando:", error);
    }
}

// 4. FUNCIÓN AUXILIAR PARA LLENAR FORMULARIO (Prepara el UPDATE)
// Nota: Esta función hace una petición extra para obtener todos los datos del cliente (como la dirección)
async function llenarFormulario(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const cliente = await res.json();

    document.getElementById('clienteId').value = cliente.id;
    document.getElementById('nombre').value = cliente.nombre_completo;
    document.getElementById('email').value = cliente.email;
    document.getElementById('password').value = cliente.password; // Por seguridad, usualmente no se devuelve, pero para el ejemplo sirve.
    document.getElementById('telefono').value = cliente.telefono;
    document.getElementById('direccion').value = cliente.direccion_default;

    // Cambiar estado visual del formulario
    document.getElementById('form-title').innerText = "Editar Cliente";
    document.getElementById('btn-guardar').innerText = "Actualizar";
    document.getElementById('btn-cancelar').style.display = 'inline-block';
}

// Botón cancelar edición
document.getElementById('btn-cancelar').addEventListener('click', () => {
    form.reset();
    document.getElementById('clienteId').value = '';
    document.getElementById('form-title').innerText = "Registrar Nuevo Cliente";
    document.getElementById('btn-guardar').innerText = "Guardar Cliente";
    document.getElementById('btn-cancelar').style.display = 'none';
});

// Cargar la lista al iniciar
cargarClientes();