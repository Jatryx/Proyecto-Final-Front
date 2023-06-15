import { AlumnoRegistrado } from "./alumnoRegistrado";
import { Competicion } from "./competicion";

export interface ResultadoFinal{
    id: String;
    resultado: string;
    fechaFin: Date;
    competicion: Competicion;
    ganadorCompetencia: AlumnoRegistrado;
}