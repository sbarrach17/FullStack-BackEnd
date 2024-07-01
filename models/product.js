// const bcrypt = require("bcryptjs");
const pool = require("../db.js");

// PRODUCTOS

const getCollection = async () => {
    const { rows: producto } = await pool.query("SELECT * FROM productos");
    return producto;
};

const getProductById = async (productId) => {
    const values = [productId];
    const query = `
        SELECT *
        FROM productos
        WHERE id = $1
    `;
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
        return null; 
    }
    return rows[0]; 
};

const insertCollection = async (producto) => {
    const { marca, descripcion, valor,  url,  email,nombre_vendedor, apellido_vendedor,talla,  modelo } = producto;
    const values = [marca, descripcion, valor,  url, email,nombre_vendedor, apellido_vendedor , talla, modelo];
    const consulta =
        "INSERT INTO productos (marca, descripcion, valor, url, email,nombre_vendedor, apellido_vendedor,talla, modelo) VALUES ($1, $2, $3,$4, $5,$6,$7,$8,$9)";
    await pool.query(consulta, values);
};

const editProduct = async (productId, newProductData) => {
    const existingProduct = await getProductById(productId);
    if (!existingProduct) {
        throw { code: 404, message: "Producto no encontrado" };
    }
    const updatedProduct = { ...existingProduct, ...newProductData };
    const { marca, modelo, talla, valor,url,  descripcion } = updatedProduct;
    const values = [marca, modelo, talla, valor,url,  descripcion, productId];
    const query = `
        UPDATE productos
        SET marca = $1, modelo = $2, talla = $3, valor = $4, url = $5, descripcion = $6
        WHERE id = $7
    `;
    await pool.query(query, values);
    return {
        ...updatedProduct,
        id: productId,
    };
};

const getProductEmail = async (email) => {
    const values = [email];
    const query = `
        SELECT *
        FROM productos
        WHERE email = $1
    `;
    const { rows: productos } = await pool.query(query, values);
    return productos;
};

const deleteProductById = async (productId) => {
    const values = [productId];
    const query = `
        DELETE FROM productos
        WHERE id = $1
    `;
    await pool.query(query, values);
};

module.exports = {
   getCollection, insertCollection, editProduct, getProductEmail, deleteProductById
};