import { Router } from 'express';
import { 
    getClientes, 
    getCliente, 
    createCliente, 
    updateCliente, 
    deleteCliente 
} from '../controllers/clientes.controller.js';

const router = Router();

// Definir los endpoints
router.get('/', getClientes);          // Obtener todos
router.get('/:id', getCliente);        // Obtener uno por ID
router.post('/', createCliente);       // Crear (Registrar)
router.patch('/:id', updateCliente);   // Actualizar (Editar perfil)
router.delete('/:id', deleteCliente);  // Borrar

export default router;