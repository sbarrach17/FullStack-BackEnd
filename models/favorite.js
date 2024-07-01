// const bcrypt = require("bcryptjs");
const pool = require("../db.js");

const addFavoriteEmail = async (usuarioEmail, productoId) => {
    const values = [usuarioEmail, productoId];
    const query = `
        INSERT INTO favoritos (usuario_email, producto_id)
        VALUES ($1, $2)
    `;
    await pool.query(query, values);
};

const getFavoritesWithProducts = async () => {
    const query = `
        SELECT
            f.id AS favorito_id,
            u.id AS usuario_id,
            u.email AS usuario_email,
            p.id AS producto_id,
            p.marca AS producto_marca,
            p.descripcion AS producto_descripcion,
            p.valor AS producto_valor,
            p.url AS producto_url,
            p.modelo AS producto_modelo,
            p.email AS vendedor_email
        FROM favoritos f
        JOIN usuarios u ON f.usuario_email = u.email
        JOIN productos p ON f.producto_id = p.id;
    `;

    try {
        const { rows: favoritosConProductos } = await pool.query(query);
        return favoritosConProductos;
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
};

const deleteFavoriteById = async (favoriteId) => {
    const values = [favoriteId];
    const query = `
        DELETE FROM favoritos
        WHERE id = $1
    `;
    await pool.query(query, values);
};

module.exports = {
    deleteFavoriteById,
    getFavoritesWithProducts,
    addFavoriteEmail,
};
