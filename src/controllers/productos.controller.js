import { pool } from '../utils/db.js';

// 1. OBTENER TODOS LOS PRODUCTOS (GET)
export const getProductos = async (req, res) => {
    try {
        // Esta consulta une los productos con sus categorías para que se vea el nombre (ej: "Venta de Equipos")
        const [rows] = await pool.query(`
            SELECT p.*, c.nombre as categoria_nombre 
            FROM productos p 
            LEFT JOIN categorias c ON p.categoria_id = c.id
        `);
        
        console.log("✅ Productos enviados al frontend:", rows.length); 
        res.json(rows);

    } catch (error) {
        console.error("❌ Error en getProductos:", error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// 2. OBTENER UN PRODUCTO POR ID (GET)
export const getProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(`
            SELECT p.*, c.nombre as categoria_nombre 
            FROM productos p 
            LEFT JOIN categorias c ON p.categoria_id = c.id
            WHERE p.id = ?
        `, [id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// 3. CREAR PRODUCTO (POST)
export const createProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, categoria_id, sku, imagen_url } = req.body;
        
        const [rows] = await pool.query(
            'INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id, sku, imagen_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, stock, categoria_id, sku, imagen_url]
        );

        res.status(201).json({
            id: rows.insertId,
            nombre, 
            sku
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear producto: ' + error.message });
    }
};

// 4. ACTUALIZAR PRODUCTO (PATCH)
export const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, stock } = req.body; 

        const [result] = await pool.query(
            'UPDATE productos SET nombre = IFNULL(?, nombre), precio = IFNULL(?, precio), stock = IFNULL(?, stock) WHERE id = ?',
            [nombre, precio, stock, id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });

        const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar' });
    }
};

// 5. BORRAR PRODUCTO (DELETE)
export const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);

        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Producto no encontrado' });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar' });
    }
};