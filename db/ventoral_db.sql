-- ==========================================
-- SCRIPT DE BASE DE DATOS - VENTORAL
-- ==========================================

-- 1. INICIO LIMPIO
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
    nombre_completo VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(10),
    direccion_default VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Productos
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

-- Carritos
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

-- Detalles de Orden
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

-- 3. USUARIO DEL SISTEMA
DROP USER IF EXISTS 'ventoral_user'@'localhost';
CREATE USER 'ventoral_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pass1234';
GRANT ALL PRIVILEGES ON ventoral_db.* TO 'ventoral_user'@'localhost';
FLUSH PRIVILEGES;

-- 4. DATOS DE PRUEBA (SEED)

-- Categorías (IDs fijos)
INSERT INTO categorias (id, nombre, descripcion) VALUES 
(1, 'Venta de Equipos', 'Equipos de aire acondicionado'),
(2, 'Diagnóstico y Reparaciones', 'Evaluación técnica'),
(3, 'Refacciones y Accesorios', 'Repuestos y complementos'),
(4, 'Instalación y Mantenimiento', 'Servicios profesionales');

-- Productos (Con tus imágenes reales)
INSERT INTO productos (categoria_id, sku, nombre, precio, stock, imagen_url) VALUES 
-- Equipos
(1, 'EQ-PRIME-1T', 'Minisplit Prime Elite 1 Tonelada (Solo Frío) 220V', 3879.00, 10, 'img/Pro2 Mini.jpeg'),
(1, 'EQ-HIS-1.5T', 'Minisplit Hisense Inverter 1.5 Ton (Frio/Calor) Wifi', 12899.00, 5, 'img/Pro1 Mini.jpeg'),
(1, 'EQ-MABE-10', 'Refrigerador Mabe 10 pies cúbicos (250L) con Despachador', 7777.77, 3, 'img/Pro5.jpeg'),
(1, 'EQ-ASTRO-6L', 'Frigobar Portátil AstroAI 6 Litros AC/DC', 1500.00, 15, 'img/Pro4.jpeg'),
(1, 'EQ-MIR-V32', 'Minisplit Mirage Inverter V32 1 Tonelada (Solo Frío)', 6500.00, 8, 'img/ico Pro3.jpeg'),
-- Diagnóstico
(2, 'SERV-DIAG-REF', 'Diagnóstico Profesional de Falla - Refrigeradores', 300.00, 999, 'img/Img Diag Refri.png'),
(2, 'SERV-DIAG-AC', 'Diagnóstico Profesional de Falla - Aires Acondicionados', 250.00, 999, 'img/Img Diagnostico.png'),
-- Refacciones
(3, 'REF-CAL-12V', 'Calefactor y Ventilador Portátil para Coche (12V/24V)', 180.00, 20, 'img/Access5.jpeg'),
(3, 'REF-CAP-25', 'Capacitor de Trabajo para Minisplit (25 uF) - Universal', 275.00, 50, 'img/Access3.jpeg'),
(3, 'REF-KIT-AISL', 'Kit de Aislamiento para Tubería de Minisplit (Armaflex + Cinta)', 339.00, 30, 'img/Access4.jpeg'),
(3, 'REF-CTRL-UNI', 'Control Remoto Universal para Minisplit (Compatible Mirage)', 300.00, 40, 'img/Access1.jpeg'),
(3, 'REF-PROT-VOLT', 'Protector de Voltaje para Refrigeradores y Aires Inverter', 600.00, 25, 'img/Access2.jpeg'),
-- Instalación
(4, 'SERV-MANT-FRIGO', 'Mantenimiento Preventivo para Frigobar', 350.00, 999, 'img/Mante Frigo.png'),
(4, 'SERV-MANT-COM', 'Mantenimiento para Refrigeración Comercial (A Cotizar)', 350.00, 999, 'img/Img Refrigerador comerci.png'),
(4, 'SERV-MANT-MINI', 'Mantenimiento Preventivo para Minisplit', 600.00, 999, 'img/Icono mantenimiento e Inst.png'),
(4, 'SERV-MANT-REF', 'Mantenimiento Preventivo para Refrigerador y Congelador', 550.00, 999, 'img/Img mante Refri.png'),
(4, 'SERV-INST-MINI', 'Instalación Profesional de Minisplit', 1800.00, 999, 'img/Instalación Profesional de Minisplit.png');