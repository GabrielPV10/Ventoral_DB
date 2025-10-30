import express from 'express';
import productosRouter from './routes/productos.routes.js'; // Importamos rutas

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.get('/', (req, res) => res.json({ message: 'API de Ventoral funcionando' }));
app.use('/api/productos', productosRouter); // Usamos las rutas de productos

export default app;