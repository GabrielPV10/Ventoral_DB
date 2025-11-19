import { pool } from '../utils/db.js';

// 1. OBTENER TODOS LOS CLIENTES (GET)
export const getClientes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// 2. OBTENER UN CLIENTE POR ID (GET)
export const getCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// 3. CREAR NUEVO CLIENTE (POST - Registro)
export const createCliente = async (req, res) => {
  try {
    const { nombre_completo, email, password, telefono, direccion_default } = req.body;

    // Insertamos el cliente
    const [rows] = await pool.query(
      'INSERT INTO clientes (nombre_completo, email, password, telefono, direccion_default) VALUES (?, ?, ?, ?, ?)',
      [nombre_completo, email, password, telefono, direccion_default]
    );

    // Respondemos con los datos creados y el nuevo ID
    res.status(201).json({
      id: rows.insertId,
      nombre_completo,
      email,
      telefono,
      direccion_default
    });
  } catch (error) {
    // Si el email ya existe (error de base de datos duplicate entry)
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// 4. ACTUALIZAR CLIENTE (PATCH - Modificar datos)
export const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_completo, email, password, telefono, direccion_default } = req.body;

    // IFNULL permite que si no envías un dato, se mantenga el anterior
    const [result] = await pool.query(
      `UPDATE clientes SET 
        nombre_completo = IFNULL(?, nombre_completo), 
        email = IFNULL(?, email), 
        password = IFNULL(?, password), 
        telefono = IFNULL(?, telefono),
        direccion_default = IFNULL(?, direccion_default)
      WHERE id = ?`,
      [nombre_completo, email, password, telefono, direccion_default, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    // Devolvemos el cliente actualizado para confirmar
    const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
    res.json(rows[0]);

  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// 5. ELIMINAR CLIENTE (DELETE)
export const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM clientes WHERE id = ?', [id]);

    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.sendStatus(204); // 204 significa "No Content" (Borrado exitoso)
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};