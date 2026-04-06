import { DataTypes } from "sequelize";
import sequelize from "../db/connect.js";

const Motor = sequelize.define(
    "Motor", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: true,
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

export default Motor;
