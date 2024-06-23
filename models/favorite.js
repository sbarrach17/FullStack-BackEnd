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
    const { rows: favoritosConProductos } = await pool.query(
        "SELECT * FROM favoritos_productos"
    );
    return favoritosConProductos;
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
