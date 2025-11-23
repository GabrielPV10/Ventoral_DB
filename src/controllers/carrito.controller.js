import { pool } from '../utils/db.js';

// 1. AGREGAR AL CARRITO
export const addToCart = async (req, res) => {
    try {
        const { cliente_id, producto_id, cantidad } = req.body;

        // Verificar si el cliente ya tiene un carrito
        let [carritos] = await pool.query('SELECT id FROM carritos WHERE cliente_id = ?', [cliente_id]);
        let carrito_id;

        if (carritos.length === 0) {
            const [result] = await pool.query('INSERT INTO carritos (cliente_id) VALUES (?)', [cliente_id]);
            carrito_id = result.insertId;
        } else {
            carrito_id = carritos[0].id;
        }

        // Verificar si el producto ya está en el carrito
        const [items] = await pool.query('SELECT id FROM carrito_items WHERE carrito_id = ? AND producto_id = ?', [carrito_id, producto_id]);

        if (items.length > 0) {
            await pool.query('UPDATE carrito_items SET cantidad = cantidad + ? WHERE id = ?', [cantidad, items[0].id]);
        } else {
            await pool.query('INSERT INTO carrito_items (carrito_id, producto_id, cantidad) VALUES (?, ?, ?)', [carrito_id, producto_id, cantidad]);
        }

        res.json({ message: 'Agregado al carrito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar' });
    }
};

// 2. OBTENER CARRITO
export const getCart = async (req, res) => {
    try {
        const { cliente_id } = req.params;
        const [rows] = await pool.query(`
            SELECT ci.id as item_id, p.nombre, p.precio, p.imagen_url, ci.cantidad, (p.precio * ci.cantidad) as subtotal 
            FROM carritos c
            JOIN carrito_items ci ON c.id = ci.carrito_id
            JOIN productos p ON ci.producto_id = p.id
            WHERE c.cliente_id = ?
        `, [cliente_id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener carrito' });
    }
};

// 3. ELIMINAR ITEM (NUEVO)
export const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params; // El ID del item en el carrito
        await pool.query('DELETE FROM carrito_items WHERE id = ?', [id]);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar' });
    }
};