import { Router } from 'express';
import { addToCart, getCart } from '../controllers/carrito.controller.js';

const router = Router();

// POST /api/carrito/agregar  -> Requiere JSON { cliente_id, producto_id, cantidad }
router.post('/agregar', addToCart);

// GET /api/carrito/:cliente_id -> Obtiene la lista de items
router.get('/:cliente_id', getCart);

export default router;