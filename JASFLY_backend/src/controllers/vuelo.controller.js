import { Vuelo, Piloto, Helicoptero } from "../models/index.js";

export const crearVuelo = async (req, res) => {
    try {
        const { fecha, hora, duracion, piloto_id, helicoptero_id } = req.body;
        const vuelo = await Vuelo.create({ fecha, hora, duracion, piloto_id, helicoptero_id });
        res.status(200).json(vuelo);
    } catch (error) {
        console.error("Error al crear el vuelo:", error);
        res.status(500).json({ message: "Error al crear el vuelo" });
    }
}
export const obtenerVuelos = async (req, res) => {
    try {
        const vuelos = await Vuelo.findAll({
            include: [Piloto, Helicoptero]
        });
        res.status(200).json(vuelos)

    } catch (error) {
        console.error("Error al bucar vuelos:", error);
        res.status(500).json({ message: "Error al obtener vuelos" });

    }
}
export const obtenerVueloID = async (req, res) => {
    try {
        const id = req.params.id;
        const vuelo = await Vuelo.findByPk(id, {
            include: [Piloto, Helicoptero]
        });
        if (!vuelo) {
            return res.status(404).json({
                menssage: "Vuelo no encontrado"
            })
        }
        res.status(200).json(vuelo);
    } catch (error) {
        console.log("Error al obtener el  vuelo:", error);
        res.status(500);
    }
}
export const actualizarVuelo = async (req, res) => {
    try {
        const id = req.params.id;
        const { fecha, hora, duracion, piloto_id, helicoptero_id } = req.body;
        const vuelo = await Vuelo.findByPk(id);
        if (!vuelo) {
            return res.status(404).json({
                menssage: "Vuelo no encontrado"
            })
        }
        vuelo.fecha = fecha;
        vuelo.hora = hora;
        vuelo.duracion = duracion;
        vuelo.piloto_id = piloto_id;
        vuelo.helicoptero_id = helicoptero_id;
        await vuelo.save();
        res.status(200).json(vuelo);
    } catch (error) {
        console.log("Error al actualizar el  vuelo:", error);
        res.status(500);
    }
}
export const obtenerVuelosPiloto = async (req, res) => {
    try {
        const id = req.params.id;
        const vuelos = await Vuelo.findAll({
            where: { piloto_id: id }
        });
        res.status(200).json(vuelos);
    } catch (error) {
        console.log("Error al obtener los vuelos del piloto:", error);
        res.status(500);
    }
}
export const obtenerVuelosHelicoptero = async (req, res) => {
    try {
        const id = req.params.id;
        const vuelos = await Vuelo.findAll({
            where: { helicoptero_id: id }
        });
        res.status(200).json(vuelos);
    } catch (error) {
        console.log("Error al obtener los vuelos del helicoptero:", error);
        res.status(500);
    }
}