import app from './app.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\nSERVIDOR INICIADO EN EL PUERTO ${PORT}`);
  console.log(`==========================================`);
  console.log(`Tienda (Clientes):  http://localhost:${PORT}/index.html`);
  console.log(`Login:              http://localhost:${PORT}/login.html`);
  console.log(`Panel Admin:        http://localhost:${PORT}/admin.html`);
  console.log(`==========================================\n`);
});