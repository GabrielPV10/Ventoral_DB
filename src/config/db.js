import { createPool } from 'mysql2/promise';
import 'dotenv/config';

export const pool = await createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

try {
  await pool.query('SELECT 1');
  console.log('Conectado a MySQL');
} catch (err) {
  console.error('Error conectando a MySQL:', err.message);
}