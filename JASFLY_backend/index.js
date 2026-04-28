import "dotenv/config"
import express from "express";
import sequelize from "./src/db/connect.js";
import "./src/models/index.js";
import pilotoRoutes from "./src/routes/piloto.routes.js";
import vuelosRoutes from "./src/routes/vuelo.routes.js";
import helicopteroRoutes from "./src/routes/helicoptero.routes.js";

import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const app = express();

const PORT = process.env.PORT || 3000;

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "JASFLY API",
            version: "1.0.0",
            description: "API para el manejo de vuelos, pilotos y helicópteros"
        },
        servers: [
            {
                url: `http://localhost:${PORT}`
            }
        ]
    },
    apis: ["./src/routes/*.js"] // Aquí buscará los comentarios de la documentación
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Configuración manual de CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

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