# Crud-de-tareas

# BACKEND: apiTasks
1. Preparación del Proyecto:
Asegúrate de tener todas las dependencias listadas en tu package.json.
Estas dependencias se instalan con el comando: npm install
Confirma que el código está correctamente organizado y funcional en tu entorno de desarrollo.
2. Configuración de la Base de Datos:
El archivo env tiene que cambiarlo por .env
Por temas de seguridad dejé en blanco el usuario y contraseña de la base de datos, las credenciales de base de datos MySql suelen ser por defecto:
DB_USERNAME=root
DB_PASSWORD=
Ejecuta el script de base de datos que está en apiTasks/sql/init-db.sql en una herramienta de administración y gestión de bases de datos MySQL
De ser necesario asegurarse que el puerto donde se está ejecutando MySQL sea 3306
3. Levantar el servidor
Una vez que se aseguró de las anteriores configuraciones ejecute en la terminal: npm run dev

# FRONTEND: tasks
1. Preparación del Proyecto:
Asegúrate de tener todas las dependencias listadas en tu package.json.
Ejecutar el comando: npm install
Con eso deberian instalarse todas las dependencias
2. Ejecución de la Aplicación:
Antes de desplegar la aplicación, tiene que tener levantado el servidor de apiTasks
El proyecto puede verlo automáticamente en navegador Edge o caso contrario poner la url: localhost:3000
