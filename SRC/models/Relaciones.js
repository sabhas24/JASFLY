import Piloto from "./piloto.js";
import Helicoptero from "./Helicoptero.js";
import Vuelo from "./Vuelo.js";


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

export { Piloto, Helicoptero, Vuelo };
