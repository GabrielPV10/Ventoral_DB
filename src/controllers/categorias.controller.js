import { pool } from '../config/db.js';

export const getCategorias = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categorias');
        res.json(rows);
    } catch (error) { res.status(500).json({ message: 'Error' }); }
};

export const createCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        await pool.query('INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
        res.json({ message: 'Categoría creada' });
    } catch (error) { res.status(500).json({ message: 'Error' }); }
};

export const deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM categorias WHERE id = ?', [id]);
        res.json({ message: 'Categoría eliminada' });
    } catch (error) { res.status(500).json({ message: 'Error' }); }
};

export const updateCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        await pool.query('UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, id]);
        res.json({ message: 'Categoría actualizada' });
    } catch (error) { res.status(500).json({ message: 'Error' }); }
};

export const getCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM categorias WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (error) { res.status(500).json({ message: 'Error' }); }
};