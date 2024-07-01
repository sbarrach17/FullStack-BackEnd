const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.Routes.js");

const app = express();

// Configurar opciones para el middleware cors
const corsOptions = {
  origin: "https://fullstack-frontend-yybf.onrender.com",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error en servidor!');
});

app.listen(3000, () => console.log("SERVIDOR ENCENDIDO"));

module.exports = app;
