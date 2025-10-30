# Proyecto API Rest - Ventoral

API REST para la gestión de la tienda Ventoral, creada con Node.js, Express y MySQL.

## Requisitos
* Node.js (v18+)
* MySQL (v8+)

## Instalación

1.  Clonar el repositorio:
    `git clone https://github.com/tu-usuario/tu-repositorio.git`
    **(Este es el nombre de tu repositorio - Requisito 5)**

2.  Instalar las dependencias de Node.js:
    ```bash
    npm install
    ```

## Configuración de la Base de Datos

1.  Abre MySQL Workbench (o tu cliente de MySQL) y conéctate como 'root'.
2.  Ejecuta el script SQL que se encuentra en `db/ventoral_db.sql` para crear la base de datos y las tablas.
3.  Ejecuta el siguiente script SQL para crear el usuario de la aplicación:
    ```sql
    -- Cambia 'mi_password_segura' por tu contraseña
    CREATE USER 'ventoral_user'@'localhost' 
    IDENTIFIED WITH mysql_native_password BY 'mi_password_segura';

    GRANT ALL PRIVILEGES ON ventoral_db.* TO 'ventoral_user'@'localhost';
    
    FLUSH PRIVILEGES;
    ```

4.  Renombra el archivo `.env.example` a `.env` (o crea un archivo `.env`).
5.  Modifica el archivo `.env` con tus credenciales:
    ```env
    MYSQL_HOST=localhost
    MYSQL_PORT=3307
    MYSQL_USER=ventoral_user
    MYSQL_PASSWORD=mi_password_segura
    MYSQL_DB=ventoral_db
    PORT=3000
    ```

## Ejecutar la Aplicación

Para iniciar el servidor en modo de desarrollo (con reinicio automático):
```bash
npm run dev