import { Competicion } from "./competicion";
import { ResultadoFinal } from "./resultadoFinal";

export interface AlumnoRegistrado {
    id: String;
    nombre: string;
    apellidos: string;
    clase: string;
    dni: string;
    estado: string;
    role: string;
    competiciones: Competicion[];
    resultadosFinales: ResultadoFinal[];
    password: string;
  }