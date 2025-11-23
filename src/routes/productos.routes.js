import { Router } from 'express';
// Importamos las funciones del controlador que creamos
import { 
    getProductos, 
    getProducto, 
    createProducto, 
    updateProducto, 
    deleteProducto 
} from '../controllers/productos.controller.js';

const router = Router();

// Definir las rutas (Endpoints)

// GET /api/productos -> Obtener todos
router.get('/', getProductos);

// GET /api/productos/:id -> Obtener uno solo
router.get('/:id', getProducto);

// POST /api/productos -> Crear nuevo
router.post('/', createProducto);

// PATCH /api/productos/:id -> Actualizar
router.patch('/:id', updateProducto);

// DELETE /api/productos/:id -> Borrar
router.delete('/:id', deleteProducto);

export default router;