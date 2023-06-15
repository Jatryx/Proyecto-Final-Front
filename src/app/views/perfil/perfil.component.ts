import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlumnoRegistrado } from 'src/app/interfaces/alumnoRegistrado';
import { Competicion } from 'src/app/interfaces/competicion';
import { ResultadoFinal } from 'src/app/interfaces/resultadoFinal';
import { AlumnosRegistradosService } from 'src/app/services/alumnos-registrados.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  constructor(
    private fb: FormBuilder,
    private AlumnoRegistradoService: AlumnosRegistradosService,
    private router: Router,
  ) {
    this.detallesDelAlumnoForm = this.fb.group({
      dni: '',
      nombre: '',
      apellidos: '',
      clase: '',
      role: '',
    });
  }

  AlumnoRegistrado!: AlumnoRegistrado;
  detallesDelAlumnoForm!: FormGroup;
  dni!: string;
  nombre!: String;
  apellidos!: String;
  clase!: String;
  role!: String;
  Competiciones: Competicion[] = [];
  ResultadosFinales: ResultadoFinal[] = [];

  getRole() {
    const token = sessionStorage.getItem('token');

    if (token) {
      const tokenData = JSON.parse(token);

      const role = tokenData.role;

      if (role == 'Profesor') {
        return null;
      } else {
        return role;
      }
    }
  }

  getDNI() {
    const token = sessionStorage.getItem('token');

    if (token) {
      const tokenData = JSON.parse(token);

      const paraBuscar = tokenData.dni;

      return paraBuscar;
    }
  }

  ngOnInit(): void {
    this.getAlumno();
  }

  getAlumno() {
    const dni = this.getDNI();
    console.log(dni);

    this.AlumnoRegistradoService.obtenerAlumnoRegistradoMedianteDNI(dni).subscribe(
      (resp: AlumnoRegistrado) => {
        console.log(resp);
        this.detallesDelAlumnoForm.setValue({
          dni: resp.dni,
          nombre: resp.nombre,
          apellidos: resp.apellidos,
          clase: resp.clase,
          role: resp.role,
        });
        this.AlumnoRegistrado = resp;
      },
      (error: any) => {
        alert('No se pudo cargar el alumno');
      }
    );
  }
}