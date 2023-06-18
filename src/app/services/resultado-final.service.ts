import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultadoFinal } from '../interfaces/resultadoFinal';

@Injectable({
  providedIn: 'root'
})
export class ResultadoFinalService {

  private apiURL = "http://backtfg-env.eba-zg8rkiyc.us-east-1.elasticbeanstalk.com/api/v0/resultadofinal/";

  constructor(private http: HttpClient) { }

  añadirUnResultadoFinaldeUnGanador(nombreCompeticion:String,ganador:String,ResultadoFinal: ResultadoFinal){
    return this.http.post(`${this.apiURL}competicion/${nombreCompeticion}/${ganador}`,ResultadoFinal);
  }

  obtenerResultadoPorNombreCompeticion(nombreCompeticion:String){
    return this.http.get<ResultadoFinal>(`${this.apiURL}competicion/${nombreCompeticion}`);
  }

  obtenerResultadoFinalPorGanador(ganador:String){
    return this.http.get<ResultadoFinal[]>(`${this.apiURL}${ganador}`);
  }

  obtenerMedianteId(id:String){
    return this.http.get<ResultadoFinal>(`${this.apiURL}${id}`);
  }

  eliminarMedianteId(id:String){
    return this.http.delete(`${this.apiURL}${id}`);
  } 

}
