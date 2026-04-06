import { Router } from "express";
import { crearPiloto, obtenerPilotos, obtenerPilotoID, actualizarPiloto, eliminarPiloto } from "../controllers/piloto.controller.js";

const router = Router();

router.post("/", crearPiloto);
router.get("/", obtenerPilotos);
router.get("/:id", obtenerPilotoID);
router.put("/:id", actualizarPiloto);


export default router;