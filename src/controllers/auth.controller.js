import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs'; // Importamos la librería de seguridad

// 1. REGISTRO DE USUARIO (Register)
export const register = async (req, res) => {
    try {
        const { nombre_completo, email, password, telefono, direccion_default } = req.body;

        // --- VALIDACIÓN 1: Teléfono a 10 dígitos (México) ---
        // Regex: Solo permite exactamente 10 números
        if (!/^\d{10}$/.test(telefono)) {
            return res.status(400).json({ 
                message: 'El teléfono debe tener exactamente 10 dígitos numéricos (Ej: 9611234567).' 
            });
        }

        // --- VALIDACIÓN 2: Encriptar contraseña (Hashing) ---
        // El "10" es el costo de procesamiento (más alto = más seguro pero más lento)
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Insertamos en la BD (¡Guardamos el HASH, no la contraseña real!)
        const [rows] = await pool.query(
            'INSERT INTO clientes (nombre_completo, email, password, telefono, direccion_default) VALUES (?, ?, ?, ?, ?)',
            [nombre_completo, email, passwordHash, telefono, direccion_default]
        );

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            id: rows.insertId,
            email
        });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }
        return res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};

// 2. INICIO DE SESIÓN (Login)
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // A. Buscar al usuario por Email
        const [rows] = await pool.query('SELECT * FROM clientes WHERE email = ?', [email]);
        
        // Si no existe el usuario
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const usuario = rows[0];

        // B. Comparar contraseña (La que escribe vs El Hash de la BD)
        const esCorrecta = await bcrypt.compare(password, usuario.password);

        if (!esCorrecta) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // C. Login Exitoso
        // (Aquí es donde más adelante se enviaría un Token JWT)
        res.json({
            message: '¡Login exitoso!',
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre_completo,
                email: usuario.email
            }
        });

    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};