import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AlumnosCentro } from '../interfaces/alumnoCentro';

@Injectable({
  providedIn: 'root'
})
export class AlumnosCentroService {

  private apiURL = "http://backtfg-env.eba-zg8rkiyc.us-east-1.elasticbeanstalk.com/api/v0/alumnoscentro/";

  constructor(private http: HttpClient) { }

  guardarAlumnoCentro(data: FormData){
      return this.http.post(`${this.apiURL}`,data);
  }

  obtenertodosAlumnosCentro(){
    return this.http.get<AlumnosCentro[]>(`${this.apiURL}`);
  }

  obtenerUnAlumnosCentroMedianteDNI(dni: String){
    return this.http.get<AlumnosCentro>(`${this.apiURL}${dni}`);
  }

  actualizarUnAlumnosCentroMedianteDNI(dni:String, data:FormData){
    return this.http.put(`${this.apiURL}${dni}`,data);
  }

  eliminarUnAlumnosCentroMedianteDNI(dni:String){
    return this.http.delete(`${this.apiURL}${dni}`);
  }
}
