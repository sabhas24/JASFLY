const express = require("express"); // importamos express
const dotenv = require("dotenv"); // importamos dotenv

dotenv.config(); // cargamos las variables de entorno

const app = express(); // creamos la aplicacion

const PORT = process.env.PORT

console.log(`Server running on port ${PORT}`);
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});