import { DataTypes } from "sequelize";
import sequelize from "../db/connect.js";

const Helicoptero = sequelize.define(
    "Helicoptero",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        modelo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        odometro: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        timestamps: true,
    }
);

export default Helicoptero;