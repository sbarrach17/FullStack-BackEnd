const { Pool } = require('pg');
require('dotenv').config(); // Carga las variables de entorno desde .env

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    allowExitOnIdle: true
});

module.exports = pool;
