const { Pool } = require('pg');
require('dotenv').config();

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
        throw new Error(error.message); // Throw a new Error object with the error message
    } else {
        console.log('DB conectada');
    }
});

module.exports = pool;
