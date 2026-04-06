import Piloto from "./Piloto.js";
import Helicoptero from "./Helicoptero.js";
import Vuelo from "./Vuelo.js";
import Motor from "./Motor.js";


Piloto.hasMany(Vuelo, {
    foreignKey: "pilotoId",
    sourceKey: "id"
});
Vuelo.belongsTo(Piloto, {
    foreignKey: "pilotoId",
    targetKey: "id"
});

Helicoptero.hasMany(Vuelo, {
    foreignKey: "helicopteroId",
    sourceKey: "id"
});
Vuelo.belongsTo(Helicoptero, {
    foreignKey: "helicopteroId",
    targetKey: "id"
});
Helicoptero.hasOne(Motor, {
    foreignKey: "helicopteroId",
    sourceKey: "id"
});
Motor.belongsTo(Helicoptero, {
    foreignKey: "helicopteroId",
    targetKey: "id"
});
export { Piloto, Helicoptero, Vuelo };
