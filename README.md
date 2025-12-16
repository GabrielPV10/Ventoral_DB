# Proyecto API Rest - Ventoral
API REST y Aplicación Web para la gestión de la tienda **Ventoral** (E-commerce de Climatización).
Desarrollado con arquitectura MVC utilizando **Node.js, Express y MySQL**.

## Requisitos Previos

* **Node.js** (v18 o superior)
* **MySQL Server** (v8.0 o superior)
* **Git** (para clonar el repositorio)
* **Terminal/Consola** (CMD, PowerShell o Bash)

## 1. Instalación y Configuración (Vía Consola)
Sigue estos pasos para desplegar el proyecto rápidamente usando la terminal.
### Paso 1: Clonar y Dependencias
Descarga el código y las librerías necesarias.
# Clonar el repositorio
git clone [https://github.com/GabrielPV10/Ventoral_DB.git](https://github.com/GabrielPV10/Ventoral_DB.git)
# Entrar a la carpeta
cd Ventoral_DB
# Instalar dependencias
npm install
Paso 2: Base de Datos (Importación por Comandos)
Puedes importar la base de datos directamente sin abrir programas externos.
Opción A: Si tu MySQL usa el puerto estándar (3306)
# Te pedirá tu contraseña de root al dar Enter
mysql -u root -p

Opción B: Si usas un puerto personalizado (ej. 3307)
mysql -u root -p --port=3307
Si el comando anterior no funciona en tu terminal (PowerShell), entra primero a MySQL:
mysql -u root -p --port=3307
source db/ventoral_db.sql
exit

Paso 3: Variables de Entorno (.env)
Configura la conexión. Crea un archivo llamado .env en la raíz del proyecto y pega el siguiente contenido:
Fragmento de código

MYSQL_HOST=localhost
MYSQL_PORT=3307      <-- ¡OJO! Cambia esto al puerto que use tu MySQL (3306 o 3307)
MYSQL_USER=ventoral_user
MYSQL_PASSWORD=pass1234
MYSQL_DB=ventoral_db
PORT=3000            <-- Puerto donde abrirá la página web

2. Ejecutar la Aplicación
Para iniciar el servidor en modo desarrollo (con reinicio automático):
npm run dev
Si todo es correcto, verás en la terminal:
Plaintext
Conectado a MySQL
SERVIDOR INICIADO EN EL PUERTO 3000

3. Guía de Uso
Importante: No es necesario usar "Live Server". El propio backend sirve los archivos estáticos. Abre tu navegador en http://localhost:3000 (o el puerto que hayas configurado).

Opción A: Cliente (Tienda)
Para ver el catálogo y realizar compras:

Ve a Login: http://localhost:3000/login.html
Haz clic en "¿No tienes cuenta? Regístrate aquí".
Regístrate con cualquier correo (ej: juan@correo.com).
Al entrar, podrás agregar productos al carrito y simular compras.

Opción B: Administrador (Panel de Gestión)
Para gestionar productos y ver ventas, necesitas el rol de Admin.
Ve al Registro: http://localhost:3000/register.html

OBLIGATORIO: Debes registrarte usando el correo maestro:
Correo: admin@ventoral.com
Contraseña: (La que tú quieras)
Inicia sesión con ese correo.
El sistema detectará el rol y te redirigirá automáticamente al Panel Administrativo (admin.html).
📂 Método Alternativo (Gráfico)
Si prefieres usar herramientas visuales para la base de datos:
Abre MySQL Workbench.
Conéctate a tu servidor local.
Ve a File > Open SQL Script y selecciona db/ventoral_db.sql.
Ejecuta todo el script (Icono del rayo ⚡).
Continúa desde el Paso 3 de la guía anterior.