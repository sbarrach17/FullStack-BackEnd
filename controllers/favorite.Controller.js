const jwt = require("jsonwebtoken");
const {
    deleteFavoriteById,
    getFavoritesWithProducts,
    addFavoriteEmail,
} = require("../models/favorite");

const addFavoriteHandler = async (req, res) => {
    try {
        const { productoId } = req.body;
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "az_AZ");
        const usuarioEmail = decoded.email;

        await addFavoriteEmail(usuarioEmail, productoId);

        res.status(200).send("Producto agregado a favoritos exitosamente");
    } catch (error) {
        console.error("Error al agregar producto a favoritos:", error);
        res.status(error.code || 500).send(error);
    }
};

const getFavoritesWithProductsHandler = async (req, res) => {
    try {
        const favoritosConProductos = await getFavoritesWithProducts();
        res.json(favoritosConProductos);
    } catch (error) {
        console.error("Error al obtener favoritos con productos:", error);
        res.status(error.code || 500).send(error);
    }
};

const deleteFavoriteHandler = async (req, res) => {
    try {
        const favoriteId = req.params.id; 
        await deleteFavoriteById(favoriteId); 
        res.status(200).send("Favorito eliminado exitosamente");
    } catch (error) {
        console.error("Error al eliminar favorito:", error);
        res.status(error.code || 500).send(error);
    }
};

module.exports = {
    getFavoritesWithProductsHandler,
    deleteFavoriteHandler,
    addFavoriteHandler,
};
