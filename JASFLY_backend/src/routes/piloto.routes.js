import { Router } from "express";
import { crearPiloto, obtenerPilotos, obtenerPilotoID, actualizarPiloto, eliminarPiloto, loginPiloto, subirFoto } from "../controllers/piloto.controller.js";

const router = Router();

router.post("/", crearPiloto);
router.get("/", obtenerPilotos);
router.get("/:id", obtenerPilotoID);
router.put("/:id", actualizarPiloto);
router.put("/:id/foto", subirFoto);
router.post("/login", loginPiloto);

export default router;