import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlumnoRegistrado } from '../interfaces/alumnoRegistrado';

@Injectable({
  providedIn: 'root'
})
export class AlumnosRegistradosService {



  constructor(private http:HttpClient) { }

  private apiURL = "http://localhost:8040/api/v0/alumnosregistrados/";

  crearAlumnoRegistrado(data: FormData){
    return this.http.post(`${this.apiURL}`,data);
  }

  obtenerAlumnoRegistradoMedianteDNI(dni:String){
    return this.http.get<AlumnoRegistrado>(`${this.apiURL}${dni}`);
  }

  actualizarAlumnoRegistradoMedianteDNI(dni:String,data: FormData){
    return this.http.put(`${this.apiURL}${dni}`,data);
  }

  eliminarAlumnoRegistradoMedianteDNI(dni:String){
    return this.http.delete(`${this.apiURL}${dni}`);
  }

  admitirAlumnoRegistradoMedianteDNI(dni: String, algo: string) {
    return this.http.put(`${this.apiURL}admitirAlumno/${dni}`, algo);
  }

  obtenerTodosLosAlumnosRegistrado(){
    return this.http.get<AlumnoRegistrado[]>(`${this.apiURL}`);
  }

  obtenerEstado(estado:String){
    return this.http.get<AlumnoRegistrado[]>(`${this.apiURL}estado/${estado}`)
  }
}
