const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.Routes.js");

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(userRoutes);

const corsOptions = {
  origin: 'https://fullstack-frontend-x1zs.onrender.com', // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization'
};

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error en servidor!');
});

app.listen(3000, () => console.log("SERVIDOR ENCENDIDO"));

module.exports= app