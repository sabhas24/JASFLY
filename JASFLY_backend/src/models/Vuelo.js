import { DataTypes } from "sequelize";
import sequelize from "../db/connect.js";

const Vuelo = sequelize.define(
    "vuelo",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        origen: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        destino: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        horaInicio: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        horaFin: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        odometroInicio: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        odometroFin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        puestaEnMarcha: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        tirosDeAgua: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        }
    },
    {
        timestamps: true,
    }
);

export default Vuelo;