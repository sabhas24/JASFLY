export interface Flight {
    id: number;
    pilotoId: number;
    helicopteroId: number;
    fecha: Date;
    origen: string;
    destino: string;
    horaInicio: string;
    horaFin: string;
    odometroInicio: number;
    odometroFin: number;
    puestaEnMarcha: number;
    tirosDeAgua: number;
    Piloto?: any;
    Helicoptero?: any;
}   