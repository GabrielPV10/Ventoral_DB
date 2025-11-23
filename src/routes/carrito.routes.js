import { Router } from 'express';
import { addToCart, getCart, deleteCartItem } from '../controllers/carrito.controller.js';

const router = Router();

router.post('/agregar', addToCart);        // Agregar
router.get('/:cliente_id', getCart);       // Ver
router.delete('/item/:id', deleteCartItem); // Borrar (Esta es la nueva)

export default router;