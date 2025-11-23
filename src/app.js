import express from 'express';
import cors from 'cors';
import productosRouter from './routes/productos.routes.js';
import clientesRouter from './routes/clientes.routes.js';
import authRouter from './routes/auth.routes.js';
import carritoRouter from './routes/carrito.routes.js';
import ordenesRouter from './routes/ordenes.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'API de Ventoral funcionando' }));

// Definir los endpoints
app.use('/api/productos', productosRouter);
app.use('/api/clientes', clientesRouter); 
app.use('/api/auth', authRouter);
app.use('/api/carrito', carritoRouter);
app.use('/api/ordenes', ordenesRouter);

export default app;