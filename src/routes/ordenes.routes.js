import { Router } from 'express';
import { createOrder } from '../controllers/ordenes.controller.js';

const router = Router();

router.post('/', createOrder); // POST /api/ordenes

export default router;