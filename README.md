# Proyecto API Rest - Ventoral
API REST para la gestión de la tienda Ventoral (E-commerce de Climatización), creada con Node.js, Express y MySQL.

## Requisitos Previos
* **Node.js** (v18 o superior)
* **MySQL Server** (v8.0 o superior)
* **MySQL Workbench** (opcional, para visualizar la BD)

## 1. Instalación del Proyecto
1.  Clonar el repositorio:
    git clone [https://github.com/GabrielPV10/Ventoral_DB.git](https://github.com/GabrielPV10/Ventoral_DB.git)

2.  Entrar a la carpeta del proyecto e instalar las dependencias:
    cd Ventoral_DB
    npm install

## 2. Configuración de la Base de Datos
El proyecto incluye un script automatizado que crea la base de datos, las tablas, los datos de prueba y el usuario de conexión.

1.  Abra **MySQL Workbench** y conéctese a su instancia local (usualmente como usuario `root`).
2.  Abra el archivo SQL ubicado en: `db/ventoral_db.sql`.
3.  Ejecute todo el script (Icono del rayo ⚡).

> **Nota:** Este script creará automáticamente un usuario llamado `ventoral_user` con la contraseña `pass1234`.

## 3. Configuración de Variables de Entorno
1.  En la raíz del proyecto, cree un nuevo archivo llamado.
2.  Copie y pegue la siguiente configuración (coincide con el usuario creado por el script SQL):
MYSQL_HOST=localhost
MYSQL_PORT=3307
MYSQL_USER=ventoral_user
MYSQL_PASSWORD=pass1234
MYSQL_DB=ventoral_db
PORT=3000

## 4. Ejecutar la Aplicación
Para iniciar el servidor en modo de desarrollo:

npm run dev
Si todo es correcto, verá en la terminal: Conectado a MySQL API escuchando en http://localhost:3000

Endpoints de Prueba
Verificación de estado: GET http://localhost:3000/

Listar productos: GET http://localhost:3000/api/productos