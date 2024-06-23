// const bcrypt = require("bcryptjs");
const pool = require("../db.js");

const insertCarItem = async (carroItem) => {
    const {
        nombre,
        apellido,
        rut,
        email,
        numero,
        region,
        comuna,
        direccion,
        domicilio,
        departamento,
        metodoPago,
        producto_id
    } = carroItem;

    const values = [
        nombre,
        apellido,
        rut,
        email,
        numero,
        region,
        comuna,
        direccion,
        domicilio,
        departamento,
        metodoPago,
        producto_id,
    ];

    const query = `
        INSERT INTO carro (
            nombre,
            apellido,
            rut,
            email,
            numero,
            region,
            comuna,
            direccion,
            domicilio,
            departamento,
            metodoPago,
            producto_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `;

    await pool.query(query, values);
};

module.exports={
    insertCarItem
}