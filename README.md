# Práctica 10: Autenticación y Base de Datos - Ventoral

Aplicación web que implementa un sistema de **Registro y Autenticación de Usuarios** seguro (con contraseñas encriptadas) conectado a una base de datos MySQL completa para un E-commerce.

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

El proyecto incluye un script automatizado que crea la estructura completa del E-commerce (Clientes, Productos, Órdenes, Pagos) y el usuario de conexión.

1.  Abra **MySQL Workbench** y conéctese a su instancia local (usualmente como usuario `root`).
2.  Abra el archivo SQL ubicado en: `db/ventoral_db.sql`.
3.  Ejecute todo el script (Icono del rayo ⚡).

> **Nota:** Este script creará automáticamente un usuario llamado `ventoral_user` con la contraseña `pass1234`.

## 3. Configuración de Variables de Entorno

1.  En la raíz del proyecto, cree un nuevo archivo llamado `.env`.
2.  Copie y pegue la siguiente configuración:

MYSQL_HOST=localhost
MYSQL_PORT=3307
MYSQL_USER=ventoral_user
MYSQL_PASSWORD=pass1234
MYSQL_DB=ventoral_db
PORT=3000

(Nota: Verifique si su MySQL corre en el puerto 3306 o 3307 y ajuste MYSQL_PORT si es necesario).

## 4. Ejecutar la Aplicación (Backend)
Para iniciar el servidor:

npm run dev
Si todo es correcto, verá en la terminal: Conectado a MySQL.

## 5. Guía de Uso (Frontend)
Esta entrega se enfoca en la autenticación de usuarios.

Vaya a la carpeta frontend y abra el archivo login.html (se recomienda usar "Open with Live Server").

Registro: Haga clic en "Regístrate aquí". Llene el formulario. La contraseña se guardará encriptada (Hash) en la base de datos.

Login: Use sus credenciales para iniciar sesión.

Validación: Si los datos son correctos, el sistema generará la sesión y le dará acceso a la pantalla de Bienvenida (index.html).