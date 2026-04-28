import { Helicoptero, Vuelo } from "../models/index.js";

export const crearHelicoptero = async (req, res) => {
    try {
        const { modelo, odometro, activo } = req.body;
        const helicoptero = await Helicoptero.create({ modelo, odometro, activo });
        res.status(200).json(helicoptero);
    } catch (error) {
        console.error("Error al crear el helicoptero:", error);
        res.status(500).json({ message: "Error al crear el helicoptero" });
    }
}
export const obtenerHelicopteros = async (req, res) => {
    try {
        const helicopteros = await Helicoptero.findAll({
            include: [Vuelo]
        });
        res.status(200).json(helicopteros)

    } catch (error) {
        console.error("Error al bucar helicopteros:", error);
        res.status(500).json({ message: "Error al obtener helicopteros" });

    }
}
export const obtenerHelicopteroID = async (req, res) => {
    try {
        const id = req.params.id;
        const helicoptero = Helicoptero.findByPk(id);
        if (!helicoptero) {
            return res.status(404).json({
                menssage: "Helicoptero no encontrado"
            })
        }
        res.status(200).json(helicoptero);
    } catch (error) {
        console.log("Error al obtener el  helicoptero:", error);
        res.status(500);
    }
}
export const actualizarHelicoptero = async (req, res) => {
    try {
        const id = req.params.id;
        const { modelo, odometro, activo } = req.body;
        const helicoptero = await Helicoptero.findByPk(id);
        if (!helicoptero) {
            return res.status(404).json({
                menssage: "Helicoptero no encontrado"
            })
        }
        helicoptero.modelo = modelo;
        helicoptero.odometro = odometro;
        helicoptero.activo = activo;
        await helicoptero.save();
        res.status(200).json(helicoptero);
    } catch (error) {
        console.log("Error al actualizar el  helicoptero:", error);
        res.status(500);
    }
}
export const obtenerHelicopterosActivos = async (req, res) => {
    try {
        const helicopteros = await Helicoptero.findAll({
            where: { activo: true }
        });
        res.status(200).json(helicopteros);
    } catch (error) {
        console.log("Error al obtener los helicopteros activos:", error);
        res.status(500);
    }
}
