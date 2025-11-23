import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', register); // Ruta para registrarse
router.post('/login', login);       // Ruta para iniciar sesión

export default router;