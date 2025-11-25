# Proyecto API Rest - Ventoral

API REST y Aplicación Web para la gestión de la tienda Ventoral (E-commerce de Climatización), creada con Node.js, Express y MySQL.

## Requisitos Previos
* **Node.js** (v18 o superior)
* **MySQL Server** (v8.0 o superior)
* **MySQL Workbench** (opcional, para visualizar la BD)
* **VS Code** con la extensión "Live Server" (recomendado para el frontend)

## 1. Instalación del Proyecto

1.  Clonar el repositorio:
    git clone [https://github.com/GabrielPV10/Ventoral_DB.git](https://github.com/GabrielPV10/Ventoral_DB.git)

2.  Entrar a la carpeta del proyecto e instalar las dependencias:
    cd Ventoral_DB
    npm install

## 2. Configuración de la Base de Datos

El proyecto incluye un script automatizado que crea la base de datos, las tablas, los datos de prueba (productos) y el usuario de conexión.

1.  Abra **MySQL Workbench** y conéctese a su instancia local (usualmente como usuario `root`).
2.  Abra el archivo SQL ubicado en: `db/ventoral_db.sql`.
3.  Ejecute todo el script (Icono del rayo ⚡).

## 3. Configuración de Variables de Entorno

1.  En la raíz del proyecto, cree un nuevo archivo llamado `.env` (puede basarse en `.env.example` si existe).
2.  Copie y pegue la siguiente configuración:

MYSQL_HOST=localhost
MYSQL_PORT=3307
MYSQL_USER=ventoral_user
MYSQL_PASSWORD=pass1234
MYSQL_DB=ventoral_db
PORT=3000
(Nota: Verifique si su MySQL corre en el puerto 3306 o 3307 y ajuste MYSQL_PORT si es necesario).

4. Ejecutar la Aplicación (Backend)
Para iniciar el servidor en modo de desarrollo:

npm run dev
Si todo es correcto, verá en la terminal: Conectado a MySQL API escuchando en http://localhost:3000

SERVIDOR INICIADO EN EL PUERTO 3000
==========================================
Tienda (Clientes):  http://localhost:3000/index.html
Login:              http://localhost:3000/login.html
Panel Admin:        http://localhost:3000/admin.html
==========================================

🌐 5. Guía de Uso (Frontend)
El proyecto cuenta con dos interfaces principales. Para acceder a ellas, navegue a la carpeta frontend y abra los archivos .html (se recomienda usar "Open with Live Server" en VS Code).

🛒 Para Clientes (Tienda)
-Entrada: Abra frontend/login.html o frontend/register.html.
-Flujo: Cree una cuenta o inicie sesión. El sistema lo redirigirá a la tienda (index.html).
-Funciones: Ver catálogo, filtrar productos, agregar al carrito y procesar pago.

⚙️ Para Administradores (Gestión)
Entrada: Abra frontend/admin.html.
Funciones:
-Gestión de Productos: Crear, editar o eliminar productos del catálogo.
-Gestión de Clientes: Ver y administrar usuarios registrados.
-Ver Pedidos: Historial de todas las ventas realizadas.