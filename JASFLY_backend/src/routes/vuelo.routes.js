import { Router } from "express";
import { crearVuelo, obtenerVuelos, obtenerVueloID, actualizarVuelo, obtenerVuelosPiloto, obtenerVuelosHelicoptero } from "../controllers/vuelo.controller.js";

const router = Router();

/**
 * @swagger
 * /vuelos:
 *   get:
 *     summary: Obtener todos los vuelos
 *     description: Retorna una lista de todos los vuelos registrados en el sistema, incluyendo sus pilotos y helicópteros asociados.
 *     responses:
 *       200:
 *         description: Lista de vuelos obtenida con éxito
 *       500:
 *         description: Error en el servidor
 */
router.get("/", obtenerVuelos);

/**
 * @swagger
 * /vuelos:
 *   post:
 *     summary: Crear un nuevo vuelo
 *     description: Registra un nuevo vuelo en el sistema
 *     responses:
 *       200:
 *         description: Vuelo creado con éxito
 */
router.post("/", crearVuelo);
router.get("/piloto/:id", obtenerVuelosPiloto);
router.get("/helicoptero/:id", obtenerVuelosHelicoptero);
router.get("/:id", obtenerVueloID);
router.put("/:id", actualizarVuelo);

export default router;
