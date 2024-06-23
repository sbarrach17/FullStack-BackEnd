const jwt = require("jsonwebtoken");
const {
  getCollection,
  insertCollection,
  getProductEmail,
  deleteProductById,
  editProduct,
} = require("../models/product.js");

// PRODUCTOS
const getUserCollection = async (req, res) => {
  try {
    const producto = await getCollection();
    res.json(producto);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const registerUserCollection = async (req, res) => {
  try {
    console.log("Producto agregado.");
    const usuario = req.body;
    await insertCollection(usuario);
    res.send("Producto agregado con exito");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const editProductController = async (req, res) => {
  const productId = req.params.id;
  const { nombre, descripcion, valor, url } = req.body;
  const updatedProductData = { nombre, descripcion, valor, url };
  try {
      const updatedProduct = await editProduct(productId, updatedProductData);
      res.status(200).json(updatedProduct);
  } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

const getProductByEmailHandler = async (req, res) => {
  try {
    const { email } = req.body;
    const productos = await getProductEmail(email);
    res.json(productos);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
};

const deleteProductHandler = async (req, res) => {
  try {
    const productId = req.params.id;
    await deleteProductById(productId);
    res.status(200).send("Producto eliminado exitosamente");
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(error.code || 500).send(error);
  }
};

module.exports = {
  getUserCollection,
  registerUserCollection,
  getProductByEmailHandler,
  deleteProductHandler,
  editProductController,
};
