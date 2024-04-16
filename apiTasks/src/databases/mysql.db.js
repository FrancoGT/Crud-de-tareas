const { Sequelize } = require('sequelize');
const config = require('config');

const DB_NAME = config.get('DB_NAME');
const DB_USERNAME = config.get('DB_USERNAME');
const DB_PASSWORD = config.get('DB_PASSWORD');
const DB_PORT = config.get('DB_PORT'); // Por defecto en MySQL es 3306

// Configurar Sequelize para utilizar MySQL como el dialecto
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    dialect: 'mysql',
    port: DB_PORT, // Puedes omitir esta línea si utilizas el puerto por defecto
    logging: false,
});

// Verificar la conexión a la base de datos
async function connectToMySQL() {
    try {
        await sequelize.authenticate();
        console.log('MySQL database connected!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

// Llamamos a la función para conectar a la base de datos
connectToMySQL();

module.exports = sequelize;