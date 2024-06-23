const jwt = require("jsonwebtoken");
const {
    insertCarItem
} = require("../models/cart");

const insertCarItemHandler = async (req, res) => {
    try {
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
        } = req.body;

        if (!nombre || !apellido || !rut || !email || !numero || !region || !comuna || !direccion || !metodoPago || !producto_id) {
            return res.status(400).send({ message: "Todos los campos requeridos deben ser proporcionados" });
        }

        const carroItem = {
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
        };

        await insertCarItem(carroItem);

        res.status(201).send("Producto agregado al carro exitosamente");
    } catch (error) {
        console.error("Error al agregar producto al carro:", error);
        const statusCode = error.code === '23502' ? 400 : 500;
        res.status(statusCode).send({
            message: "Error al agregar producto al carro",
            detail: error.detail || error.message
        });
    }
};

module.exports={
    insertCarItemHandler
}