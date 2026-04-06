import "dotenv/config"
import express from "express";
import sequelize from "./src/db/connect.js";
import "./src/models/index.js";
import pilotoRoutes from "./src/routes/piloto.routes.js";
import vuelosRoutes from "./src/routes/vuelo.routes.js";
import helicopteroRoutes from "./src/routes/helicoptero.routes.js";

const app = express();

const PORT = process.env.PORT
app.use(express.json());

app.use("/pilotos", pilotoRoutes);
app.use("/vuelos", vuelosRoutes);
app.use("/helicopteros", helicopteroRoutes);


console.log(`Server running on port ${PORT}`);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log("Conexión a la base de datos establecida correctamente.");
    } catch (error) {
        console.error("No se pudo conectar a la base de datos:", error);
    }
    console.log(`Server running on port ${PORT}`);
});