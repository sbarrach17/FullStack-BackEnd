const express = require("express");
const { Pool } = require("pg"); // Import Pool from pg module
const cors = require("cors");
const userRoutes = require("./routes/user.Routes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoutes);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:{
    rejectUnauthorized: false
  }
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error en servidor!');
});

app.listen(3000, () => console.log("SERVIDOR ENCENDIDO"));

module.exports= app