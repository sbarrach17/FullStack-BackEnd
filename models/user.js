const bcrypt = require("bcryptjs");
const pool = require("../db.js");

const getUser = async (email) => {
    const values = [email];
    const {
        rows: [usuario],
    } = await pool.query("SELECT * FROM usuarios WHERE email = $1", values);
    return usuario;
};

const getUsers = async () => {
    const { rows: usuarios } = await pool.query("SELECT * FROM usuarios");
    return usuarios;
};

const credential = async (email, password) => {
    const usuario = await getUser(email);
    if (!usuario) throw { code: 401, message: "Email o contraseña incorrecta" };
    const { password: passwordEncriptada } = usuario;
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);
    if (!passwordEsCorrecta)
        throw { code: 401, message: "Email o contraseña incorrecta" };
    return usuario;
};

const registerUser = async (usuario) => {
    let { nombre, apellido, email, password, rut } = usuario;
    const passwordEncriptada = bcrypt.hashSync(password, 10);
    const values = [nombre, apellido, email, passwordEncriptada, rut];
    const consulta = "SELECT insertar_usuario($1, $2, $3, $4, $5)";
    await pool.query(consulta, values);
};

const editUser = async (email, nuevosDatos) => {
    const usuarioExistente = await getUser(email);
    if (!usuarioExistente)
        throw { code: 404, message: "Usuario no encontrado" };
    const usuarioActualizado = { ...usuarioExistente, ...nuevosDatos };
    const { nombre, apellido, password } = usuarioActualizado;
    let passwordEncriptada = usuarioExistente.password;
    if (password) {
        passwordEncriptada = bcrypt.hashSync(password, 10);
    }
    const values = [nombre, apellido, passwordEncriptada, email];
    const consulta =
        "UPDATE usuarios SET nombre = $1, apellido = $2, password = $3 WHERE email = $4";
    await pool.query(consulta, values);
    return {
        ...usuarioActualizado,
        password: undefined,
    };
};



module.exports = {
    getUser,
    getUsers,
    credential,
    registerUser,
    editUser,
};
