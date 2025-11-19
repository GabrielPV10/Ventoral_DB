import express from 'express';
import productosRouter from './routes/productos.routes.js';
import clientesRouter from './routes/clientes.routes.js'; // <--- 1. NUEVO: Importar rutas de clientes

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.get('/', (req, res) => res.json({ message: 'API de Ventoral funcionando' }));

// Definir los endpoints
app.use('/api/productos', productosRouter);
app.use('/api/clientes', clientesRouter); // <--- 2. NUEVO: Usar rutas de clientes

export default app;