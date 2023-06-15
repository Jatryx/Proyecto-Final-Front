import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlumnosCentroService } from 'src/app/services/alumnos-centro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-anadir-alumno-centro',
  templateUrl: './anadir-alumno-centro.component.html',
  styleUrls: ['./anadir-alumno-centro.component.css']
})
export class AnadirAlumnoCentroComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private AlumnoCentroService: AlumnosCentroService,
    private router:Router,
  ) {  this.anadirAlumnoCentro = this.fb.group({
    dni: ['', Validators.required],
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    clase: ['', Validators.required],
    role: ['', Validators.required],
  });}

  anadirAlumnoCentro!:FormGroup;
  dni!:string;
  nombre!:String;
  apellidos!:String;
  clase!:String;
  role!:String;
  save() {
    if (this.anadirAlumnoCentro.invalid) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    const alumnoCentroData = this.anadirAlumnoCentro.value;
    console.log(alumnoCentroData);

    this.AlumnoCentroService.guardarAlumnoCentro(alumnoCentroData).subscribe({
      next: (res: any) => {
        Swal.fire('Alumno Guardado', '', 'success').then(() => {
          this.router.navigate(['/alumnosCentro']);
        });
      },
      error: () => {
        Swal.fire('Error', 'No se ha podido guardar el alumno', 'error');
      },
    });
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}