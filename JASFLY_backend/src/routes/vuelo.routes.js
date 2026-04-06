import { Router } from "express";
import { crearVuelo, obtenerVuelos, obtenerVueloID, actualizarVuelo, obtenerVuelosPiloto, obtenerVuelosHelicoptero } from "../controllers/vuelo.controller.js";

const router = Router();

router.post("/", crearVuelo);
router.get("/", obtenerVuelos);
router.get("/piloto/:id", obtenerVuelosPiloto);
router.get("/helicoptero/:id", obtenerVuelosHelicoptero);
router.get("/:id", obtenerVueloID);
router.put("/:id", actualizarVuelo);

export default router;
