import { DataTypes } from "sequelize";
import sequelize from "../db/connect.js";
import bcrypt from "bcrypt";

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
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    foto: {
        type: DataTypes.TEXT,
        allowNull: true,

    }
}, {
    timestamps: true,
    hooks: {

        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.contrasena = await bcrypt.hash(user.contrasena, salt);
        },
        beforeUpdate: async (user) => {
            if (user.changed('contrasena')) {
                const salt = await bcrypt.genSalt(10);

                user.contrasena = await bcrypt.hash(user.contrasena, salt);
            }
        }
    }
});
export default Piloto;