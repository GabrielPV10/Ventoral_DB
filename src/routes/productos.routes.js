import { Router } from 'express';
// (Aquí importarías tus funciones del controlador)

const router = Router();

// Ruta de prueba (después la cambiarás por el CRUD completo)
router.get('/', (req, res) => {
  res.json({ message: 'Estás en productos' });
});

// (Aquí va el resto del CRUD: router.post, router.patch, etc.)

export default router;