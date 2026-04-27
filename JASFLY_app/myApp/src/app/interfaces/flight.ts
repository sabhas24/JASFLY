export interface Flight {
    id: number;
    pilotId: number;
    aircraftId: number;
    fecha: Date;
    origen: string;
    destino: string;
    horaInicio: string;
    horaFin: string;
    odometroInicio: number;
    odometroFin: number;
    puestaEnMarcha: number;
    tirosDeAgua: number;
}   