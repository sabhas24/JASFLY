export interface Pilot {
    id: number;
    nombre: string;
    Nombre?: string;
    apellido: string;
    tipo_licencia: string;
    numero_licencia: string;
    foto?: string; // Base64 imagen de perfil
}