import { DataTypes } from "sequelize";
import sequelize from "../db/connect.js";

export const Piloto = sequelize.define(
    "Piloto", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    tipo_licencia: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    numero_licencia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    }
}, {
    timestamps: true,
});
export default Piloto;