const { Pool } = require('pg');
require('dotenv').config(); // Carga las variables de entorno desde .env

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 5432,
  });
pool.connect((error) => {
    if (error) {
        throw new error (error);
    } else {
        console.log ('DB conectada');
    }
});

module.exports = pool;