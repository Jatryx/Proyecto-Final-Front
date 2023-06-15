import { AlumnoRegistrado } from "./alumnoRegistrado";

export interface Competicion{
        id: String;
        fechaInicio: Date;
        fechaFin: Date;
        nombreCompeticion: string;
        numeroJugadores: number;
        alumnosRegistrados: AlumnoRegistrado[];
        
}
