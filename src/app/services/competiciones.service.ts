import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Competicion } from '../interfaces/competicion';
import { Form } from '@angular/forms';
import { AlumnoRegistrado } from '../interfaces/alumnoRegistrado';

@Injectable({
  providedIn: 'root'
})
export class CompeticionesService {

  private apiURL = "http://localhost:8040/api/v0/competiciones/";

  constructor(private http: HttpClient) { }

  obtenerTodasLasCompeticiones(){
    return this.http.get<Competicion[]>(`${this.apiURL}`);
  }

  añadirUnaCompeticion(data:FormData){
    return this.http.post(`${this.apiURL}`,data);
  }

  eliminarCompeticion(nombreCompeticion:String){
    return this.http.delete(`${this.apiURL}${nombreCompeticion}`);
  }

  actualizarCompeticion(nombreCompeticion:String,data: FormData){
    return this.http.put(`${this.apiURL}${nombreCompeticion}`,data);
  }

  obtenerCompeticionPorAlumno(nombreGanador:String){
    return this.http.get<Competicion[]>(`${this.apiURL}alumno/${nombreGanador}`);
  }

  asignarUnAlumnoAUnaCompeticion(nombreCompeticion:String, alumno:AlumnoRegistrado){
    return this.http.put(`${this.apiURL}asignar/${nombreCompeticion}`,alumno);
  }

  obtenerCompeticionPorNombre(nombreCompeticion:String){
    return this.http.get<Competicion>(`${this.apiURL}${nombreCompeticion}`);
  }
}
