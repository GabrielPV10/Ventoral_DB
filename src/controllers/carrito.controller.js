import { pool } from '../utils/db.js';

// 1. AGREGAR PRODUCTO AL CARRITO
export const addToCart = async (req, res) => {
    try {
        const { cliente_id, producto_id, cantidad } = req.body;

        // A. ¿El cliente ya tiene un carrito activo?
        let [carritos] = await pool.query('SELECT id FROM carritos WHERE cliente_id = ?', [cliente_id]);
        let carrito_id;

        if (carritos.length === 0) {
            // No tiene carrito, creamos uno nuevo
            const [result] = await pool.query('INSERT INTO carritos (cliente_id) VALUES (?)', [cliente_id]);
            carrito_id = result.insertId;
        } else {
            // Ya tiene carrito, usamos ese
            carrito_id = carritos[0].id;
        }

        // B. ¿El producto ya está en el carrito? (Para sumar cantidad en vez de duplicar)
        const [items] = await pool.query(
            'SELECT id, cantidad FROM carrito_items WHERE carrito_id = ? AND producto_id = ?', 
            [carrito_id, producto_id]
        );

        if (items.length > 0) {
            // Ya existe: Actualizamos la cantidad (+1)
            await pool.query(
                'UPDATE carrito_items SET cantidad = cantidad + ? WHERE id = ?', 
                [cantidad, items[0].id]
            );
        } else {
            // No existe: Insertamos nuevo item
            await pool.query(
                'INSERT INTO carrito_items (carrito_id, producto_id, cantidad) VALUES (?, ?, ?)',
                [carrito_id, producto_id, cantidad]
            );
        }

        res.json({ message: 'Producto agregado al carrito' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar al carrito' });
    }
};

// 2. VER CARRITO (Obtener productos del usuario)
export const getCart = async (req, res) => {
    try {
        const { cliente_id } = req.params;

        // Hacemos un JOIN triple: Carrito -> Items -> Productos
        // Para saber Nombre, Precio e Imagen del producto guardado
        const [rows] = await pool.query(`
            SELECT 
                ci.id as item_id, 
                p.id as producto_id,
                p.nombre, 
                p.precio, 
                p.imagen_url, 
                ci.cantidad,
                (p.precio * ci.cantidad) as subtotal
            FROM carritos c
            JOIN carrito_items ci ON c.id = ci.carrito_id
            JOIN productos p ON ci.producto_id = p.id
            WHERE c.cliente_id = ?
        `, [cliente_id]);

        res.json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el carrito' });
    }
};

// 3. ELIMINAR ITEM DEL CARRITO
export const deleteCartItem = async (req, res) => {
    try {
        const { item_id } = req.params;
        await pool.query('DELETE FROM carrito_items WHERE id = ?', [item_id]);
        res.json({ message: 'Producto eliminado del carrito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar' });
    }
};