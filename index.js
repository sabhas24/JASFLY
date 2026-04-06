import "dotenv/config"
import express from "express";
import sequelize from "./SRC/db/connect.js";
import "./SRC/models/Relaciones.js";


const app = express();

const PORT = process.env.PORT


console.log(`Server running on port ${PORT}`);
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión a la base de datos establecida correctamente.");
    } catch (error) {
        console.error("No se pudo conectar a la base de datos:", error);
    }
    console.log(`Server running on port ${PORT}`);
});