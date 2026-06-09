
import { Piloto, Vuelo } from "../models/index.js";
import bcrypt from "bcrypt";

export const loginPiloto = async (req, res) => {
    try {
        const { numero_licencia, contrasena } = req.body;
        if (!numero_licencia || !contrasena) {
            return res.status(400).json({
                menssage: "Faltan datos"
            })
        }
        const piloto = await Piloto.findOne({ where: { numero_licencia } });
        if (!piloto) {
            return res.status(404).json({
                menssage: "Piloto no encontrado"
            })
        }
        const validPassword = await bcrypt.compare(contrasena, piloto.contrasena);
        if (!validPassword) {
            return res.status(401).json({
                menssage: "Contraseña incorrecta"
            })
        }
        res.status(200).json(piloto);
    } catch (error) {
        console.log("Error al iniciar sesión:", error);
        res.status(500);
    }
}
export const crearPiloto = async (req, res) => {
    try {
        const { nombre, apellido, tipo_licencia, numero_licencia, contrasena } = req.body;
        const piloto = await Piloto.create({ nombre, apellido, tipo_licencia, numero_licencia, contrasena });
        res.status(200).json(piloto);
    } catch (error) {
        console.error("Error al crear el piloto:", error);
        res.status(500).json({ message: "Error al crear el piloto" });
    }
}
export const obtenerPilotos = async (req, res) => {
    try {
        const pilotos = await Piloto.findAll({
            include: [Vuelo]
        });
        res.status(200).json(pilotos)

    } catch (error) {
        console.error("Error al bucar pilotos:", error);
        res.status(500).json({ message: "Error al obtener pilotos" });

    }
}
export const obtenerPilotoID = async (req, res) => {
    try {
        const id = req.params.id;
        const piloto = await Piloto.findByPk(id);  // ← await faltante
        if (!piloto) {
            return res.status(404).json({
                menssage: "Piloto no encontrado"
            })
        }
        res.status(200).json(piloto);
    } catch (error) {
        console.log("Error al obtener el piloto:", error);
        res.status(500);
    }
}

export const actualizarPiloto = async (req, res) => {
    try {
        const id = req.params.id;
        const { Nombre, apellido, tipo_licencia, numero_licencia } = req.body;
        const piloto = await Piloto.findByPk(id);
        if (!piloto) {
            return res.status(404).json({
                menssage: "Piloto no encontrado"
            })
        }
        if (Nombre) piloto.Nombre = Nombre;
        if (apellido) piloto.apellido = apellido;
        if (tipo_licencia) piloto.tipo_licencia = tipo_licencia;
        if (numero_licencia) piloto.numero_licencia = numero_licencia;
        await piloto.save();
        res.status(200).json(piloto);
    } catch (error) {
        console.log("Error al actualizar el  piloto:", error);
        res.status(500);
    }
}

export const subirFoto = async (req, res) => {
    try {
        const id = req.params.id;
        const { foto } = req.body;

        if (!foto) {
            return res.status(400).json({ message: "No se proporcionó imagen" });
        }

        const piloto = await Piloto.findByPk(id);
        if (!piloto) {
            return res.status(404).json({ message: "Piloto no encontrado" });
        }

        piloto.foto = foto;
        await piloto.save();

        res.status(200).json({ message: "Foto actualizada", foto: piloto.foto });
    } catch (error) {
        console.error("Error al subir foto:", error);
        res.status(500).json({ message: "Error al subir la foto" });
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

