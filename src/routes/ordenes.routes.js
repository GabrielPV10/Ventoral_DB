import { Router } from 'express';
import { createOrder, getAllOrders } from '../controllers/ordenes.controller.js';

const router = Router();

router.post('/', createOrder);   
router.get('/', getAllOrders);  

export default router;