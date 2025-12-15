const API_URL = '/api/auth/login';
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
            alert('Bienvenido ' + data.usuario.nombre);
            localStorage.setItem('usuario', JSON.stringify(data.usuario));

            // LÓGICA DE ROLES (Admin vs Cliente)
            if (data.usuario.email === 'admin@ventoral.com') {
                window.location.href = 'admin.html'; // El jefe va al panel
            } else {
                window.location.href = 'index.html'; // Los clientes a la tienda
            }
        } else {
            errorMsg.style.display = 'block';
            errorMsg.innerText = data.message || 'Error al iniciar sesión';
        }

    } catch (error) {
        console.error(error);
        errorMsg.style.display = 'block';
        errorMsg.innerText = 'Error de conexión con el servidor';
    }
});