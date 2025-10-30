/* ---------------------------------------------------- */
/* SCRIPT DE CREACIÓN DE BASE DE DATOS Y TABLAS         */
/* PROYECTO: Ventoral                                   */
/* ---------------------------------------------------- */

-- 1. Crear la base de datos (si no existe)
CREATE DATABASE IF NOT EXISTS ventoral_db 
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. Usar la base de datos
USE ventoral_db;

-- 3. Borrar tablas si ya existen (para una re-creación limpia)
-- (Se borran en orden inverso para evitar errores de llaves foráneas)
DROP TABLE IF EXISTS orden_detalles;
DROP TABLE IF EXISTS ordenes;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS categorias;

-- 4. Creación de Tablas

-- Tabla de Categorías
CREATE TABLE IF NOT EXISTS categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Clientes
CREATE TABLE IF NOT EXISTS clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL, -- Guardar siempre encriptado (hash)
  telefono VARCHAR(20),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Productos y Servicios
CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  categoria_id INT,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  stock INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  -- Relación
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
    ON DELETE SET NULL
);

-- Tabla de Órdenes (Ventas)
CREATE TABLE IF NOT EXISTS ordenes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT,
  total DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  estado ENUM('pendiente', 'pagado', 'enviado', 'cancelado') NOT NULL DEFAULT 'pendiente',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  -- Relación
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
    ON DELETE SET NULL
);

-- Tabla de Detalles de la Orden (Carrito)
CREATE TABLE IF NOT EXISTS orden_detalles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  orden_id INT NOT NULL,
  producto_id INT,
  cantidad INT NOT NULL DEFAULT 1,
  precio_unitario DECIMAL(10, 2) NOT NULL,
  
  -- Relaciones
  FOREIGN KEY (orden_id) REFERENCES ordenes(id)
    ON DELETE CASCADE,
  
  FOREIGN KEY (producto_id) REFERENCES productos(id)
    ON DELETE SET NULL
);

/* ---------------------------------------------------- */
/* FIN DEL SCRIPT DE ESTRUCTURA                         */
/* ---------------------------------------------------- */