const API_URL = 'http://localhost:3000/api/auth/register';
const form = document.getElementById('registerForm');
const errorMsg = document.getElementById('errorMessage');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Capturar los datos
    const datosUsuario = {
        nombre_completo: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        telefono: document.getElementById('telefono').value,
        direccion_default: document.getElementById('direccion').value
    };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosUsuario)
        });

        const data = await res.json();

        if (res.ok) {
     
            alert('¡Cuenta creada con éxito! Ahora inicia sesión.');
            window.location.href = 'login.html';
        } else {
            errorMsg.style.display = 'block';
            errorMsg.innerText = data.message || 'Error al registrarse';
        }

    } catch (error) {
        console.error(error);
        errorMsg.style.display = 'block';
        errorMsg.innerText = 'Error de conexión con el servidor';
    }
});