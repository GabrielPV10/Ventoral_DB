import { pool } from '../utils/db.js';

export const createOrder = async (req, res) => {
    try {
        const { cliente_id, direccion_envio, metodo_pago, total } = req.body;

        // 1. Obtener items del carrito del cliente
        const [items] = await pool.query(`
            SELECT ci.producto_id, ci.cantidad, p.precio, p.nombre 
            FROM carritos c 
            JOIN carrito_items ci ON c.id = ci.carrito_id 
            JOIN productos p ON ci.producto_id = p.id 
            WHERE c.cliente_id = ?`, [cliente_id]);

        if (items.length === 0) {
            return res.status(400).json({ message: "El carrito está vacío" });
        }

        // 2. Crear la ORDEN
        const [ordenResult] = await pool.query(
            'INSERT INTO ordenes (cliente_id, total, direccion_servicio_entrega, estado) VALUES (?, ?, ?, ?)',
            [cliente_id, total, direccion_envio, 'pagado']
        );
        const orden_id = ordenResult.insertId;

        // 3. Mover items a ORDEN_DETALLES y Descontar STOCK
        for (const item of items) {
            // Guardar detalle
            await pool.query(
                'INSERT INTO orden_detalles (orden_id, producto_id, nombre_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?, ?)',
                [orden_id, item.producto_id, item.nombre, item.cantidad, item.precio]
            );

            // Descontar del inventario (Stock)
            await pool.query(
                'UPDATE productos SET stock = stock - ? WHERE id = ?',
                [item.cantidad, item.producto_id]
            );
        }

        // 4. Registrar el PAGO
        await pool.query(
            'INSERT INTO pagos (orden_id, metodo_pago, monto, estado) VALUES (?, ?, ?, ?)',
            [orden_id, metodo_pago, total, 'aprobado']
        );

        // 5. VACIAR EL CARRITO
        // Obtenemos el id del carrito para borrar sus items
        const [carrito] = await pool.query('SELECT id FROM carritos WHERE cliente_id = ?', [cliente_id]);
        await pool.query('DELETE FROM carrito_items WHERE carrito_id = ?', [carrito[0].id]);

        res.status(201).json({ message: '¡Compra realizada con éxito!', orden_id });

    } catch (error) {
        console.error("Error en compra:", error);
        res.status(500).json({ message: 'Error al procesar la compra' });
    }
};

// 2. OBTENER TODAS LAS ÓRDENES (Para el Admin)
export const getAllOrders = async (req, res) => {
    try {
        // Unimos Ordenes con Clientes para saber quién compró
        const [rows] = await pool.query(`
            SELECT o.id, c.nombre_completo, o.total, o.estado, o.fecha_creacion 
            FROM ordenes o
            JOIN clientes c ON o.cliente_id = c.id
            ORDER BY o.fecha_creacion DESC
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener órdenes' });
    }
};