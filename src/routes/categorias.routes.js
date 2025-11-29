import { Router } from 'express';
// Importa las nuevas funciones
import { getCategorias, createCategoria, deleteCategoria, updateCategoria, getCategoria } from '../controllers/categorias.controller.js';

const router = Router();

router.get('/', getCategorias);
router.get('/:id', getCategoria); // Nueva ruta para obtener una
router.post('/', createCategoria);
router.patch('/:id', updateCategoria); // Nueva ruta para editar
router.delete('/:id', deleteCategoria);

export default router;