import app from './app.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\nSERVIDOR INICIADO EN EL PUERTO ${PORT}`);
  console.log(`==========================================`);
  console.log(`Login: http://localhost:${PORT}/login.html`);
  console.log(`==========================================\n`);
});