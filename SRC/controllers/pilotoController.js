
import Piloto from "../models/Piloto.js";


export const crearPiloto = async (req, res) => {
    try {
        const { nombre, apellido, tipo_licencia, numero_licencia } = req.body;
        const piloto = await Piloto.create({ nombre, apellido, tipo_licencia, numero_licencia });
        res.status(200).json(piloto);
    } catch (error) {
        console.error("Error al crear el piloto:", error);
        res.status(500).json({ message: "Error al crear el piloto" });
    }
}
export const obtenerPilotos = async (req, res) => {
    try {
        const pilotos = await Piloto.findAll();
        res.status(200).json(pilotos)

    } catch (error) {
        console.error("Error al bucar pilotos:", error);
        res.status(500).json({ message: "Error al obtener pilotos" });

    }
}
export const obtenerPilotoID = async (req, res) => {
    try {
        const id = req.params.id;
        const piloto = Piloto.findByPk(id);
        if (!piloto) {
            return res.status(404).json({
                menssage: "Piloto no encontrado"
            })
        }
        res.status(200).json(piloto);
    } catch (error) {
        console.log("Error al obtener el  piloto:", error);
        res.status(500);
    }
}
export const actualizarPiloto = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, apellido, tipo_licencia, numero_licencia } = req.body;
        const piloto = await Piloto.findByPk(id);
        if (!piloto) {
            return res.status(404).json({
                menssage: "Piloto no encontrado"
            })
        }
        piloto.nombre = nombre;
        piloto.apellido = apellido;
        piloto.tipo_licencia = tipo_licencia;
        piloto.numero_licencia = numero_licencia;
        await piloto.save();
        res.status(200).json(piloto);
    } catch (error) {
        console.log("Error al actualizar el  piloto:", error);
        res.status(500);
    }
}
export const eliminarPiloto = async (req, res) => {
    try {
        const id = req.params.id;
        const piloto = await Piloto.findByPk(id);
        if (!piloto) {
            return res.status(404).json({
                menssage: "Piloto no encontrado"
            })
        }
        await piloto.destroy();
        res.status(200).json({ menssage: "Piloto eliminado correctamente" });
    } catch (error) {
        console.log("Error al eliminar el  piloto:", error);
        res.status(500);
    }
}

