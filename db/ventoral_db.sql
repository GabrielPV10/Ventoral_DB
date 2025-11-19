-- ==========================================
-- SCRIPT DE BASE DE DATOS - VENTORAL
-- ==========================================
DROP DATABASE IF EXISTS ventoral_db;
CREATE DATABASE ventoral_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ventoral_db;
-- 2. CREACIÓN DE TABLAS
-- Categorías
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(150),
    activo BOOLEAN DEFAULT TRUE
);
-- Clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(15),
    direccion_default VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Productos y Servicios
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria_id INT,
    sku VARCHAR(30) UNIQUE,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    imagen_url VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
);
-- Carrito de Compras
CREATE TABLE carritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);
CREATE TABLE carrito_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carrito_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    FOREIGN KEY (carrito_id) REFERENCES carritos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);
-- Órdenes
CREATE TABLE ordenes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    total DECIMAL(10, 2) NOT NULL,
    direccion_servicio_entrega VARCHAR(255) NOT NULL,
    estado ENUM('pendiente', 'pagado', 'en_proceso', 'completado', 'cancelado') DEFAULT 'pendiente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL
);
-- Detalles de la Orden
CREATE TABLE orden_detalles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orden_id INT NOT NULL,
    producto_id INT,
    nombre_producto VARCHAR(150) NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (orden_id) REFERENCES ordenes(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE SET NULL
);
-- Pagos
CREATE TABLE pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orden_id INT NOT NULL,
    metodo_pago ENUM('tarjeta', 'transferencia', 'efectivo', 'paypal') NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    referencia_transaccion VARCHAR(100),
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('aprobado', 'rechazado', 'pendiente') DEFAULT 'pendiente',
    FOREIGN KEY (orden_id) REFERENCES ordenes(id) ON DELETE CASCADE
);
-- 3. CREACIÓN DE USUARIO Y PERMISOS
-- Esto permite que la API se conecte sin usar root
DROP USER IF EXISTS 'ventoral_user'@'localhost';
CREATE USER 'ventoral_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pass1234';
GRANT ALL PRIVILEGES ON ventoral_db.* TO 'ventoral_user'@'localhost';
FLUSH PRIVILEGES;
-- 4. DATOS DE PRUEBA (SEED)
-- Categorías
INSERT INTO categorias (nombre, descripcion) VALUES 
('Instalación y Mantenimiento', 'Servicios técnicos especializados'), 
('Venta de Equipos', 'Equipos de aire acondicionado y refrigeración'),
('Refacciones y Accesorios', 'Repuestos para mantenimiento'),  
('Diagnóstico y Reparaciones', 'Evaluación técnica profesional');
-- Productos
INSERT INTO productos (categoria_id, nombre, precio, stock, sku) VALUES 
(1, 'Mantenimiento Preventivo Minisplit', 600.00, 999, 'SERV-MANT-MINI'),
(1, 'Instalación Básica Minisplit', 1800.00, 999, 'SERV-INST-MINI'),
(2, 'Minisplit Prime Elite 1 Tonelada 220V', 3879.00, 10, 'EQUIP-PRIME-1T'),
(2, 'Minisplit Hisense Inverter 1.5 Ton Wifi', 12899.00, 5, 'EQUIP-HIS-1.5T'),
(3, 'Control Remoto Universal', 300.00, 50, 'REF-CTRL-UNI'),
(3, 'Capacitor de Trabajo 25uF', 275.00, 20, 'REF-CAP-25'),
(4, 'Diagnóstico de Falla - Refrigeradores', 300.00, 999, 'DIAG-REFRI');
-- Cliente de prueba
INSERT INTO clientes (nombre_completo, email, password, telefono, direccion_default) VALUES 
('Usuario Pruebas', 'usuario@test.com', '12345', '9611234567', 'Av. Central 123');