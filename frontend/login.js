const API_URL = 'http://localhost:3000/api/auth/login';
const form = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMessage');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            // ¡Login Exitoso!
            alert('Bienvenido ' + data.usuario.nombre);
            
            // Guardamos un "testigo" de que ya inició sesión (opcional pero recomendado)
            localStorage.setItem('usuario', JSON.stringify(data.usuario));

            // REDIRECCIÓN: Mandamos al usuario a la página principal (el CRUD)
            window.location.href = 'index.html';
        } else {
            // Login Fallido
            errorMsg.style.display = 'block';
            errorMsg.innerText = data.message || 'Error al iniciar sesión';
        }

    } catch (error) {
        console.error(error);
        errorMsg.style.display = 'block';
        errorMsg.innerText = 'Error de conexión con el servidor';
    }
});