import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AlumnoRegistrado } from '../interfaces/alumnoRegistrado';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiURL = "http://localhost:8040/api/v0/alumnosregistrados/";

  constructor(private router:Router,private http: HttpClient) { }

  loggear(dni:String){
    return this.http.get<AlumnoRegistrado>(`${this.apiURL}${dni}`);
  }

  loggedIn() {
      return !!sessionStorage.getItem('token');
  }

  logOut() {
      sessionStorage.removeItem('token');
      this.router.navigate(['/login']);
  }

  getToken() {
      return sessionStorage.getItem('token');
  }

  isLoginPage(): boolean {
      return this.router.url === '/login';
  }

  isFormualrioPage():boolean {
    return this.router.url == '/formulario';
  }
}
