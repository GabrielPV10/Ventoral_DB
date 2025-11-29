import { Router } from 'express';
import { createOrder, getAllOrders, updateOrder } from '../controllers/ordenes.controller.js'; // Importar updateOrder

const router = Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.patch('/:id', updateOrder); // <--- NUEVA RUTA

export default router;