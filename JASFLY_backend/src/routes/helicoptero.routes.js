import { Router } from "express";
import { crearHelicoptero, obtenerHelicopteros, obtenerHelicopteroID, actualizarHelicoptero, obtenerHelicopterosActivos } from "../controllers/helicoptero.controller.js";

const router = Router();

router.post("/", crearHelicoptero);
router.get("/", obtenerHelicopteros);
router.get("/activos", obtenerHelicopterosActivos);
router.get("/:id", obtenerHelicopteroID);
router.put("/:id", actualizarHelicoptero);

export default router;