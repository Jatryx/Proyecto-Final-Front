import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlumnosRegistradosService } from 'src/app/services/alumnos-registrados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-de-alta',
  templateUrl: './formulario-de-alta.component.html',
  styleUrls: ['./formulario-de-alta.component.css']
})
export class FormularioDeAltaComponent {
  altaAlumno!: FormGroup;
  nombre!: string;
  apellidos!: string;
  clase!: string;
  dni!: string;
  role!: string;
  password!: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alumnoRegistradoService: AlumnosRegistradosService,
  ) {
    this.altaAlumno = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      clase: ['', Validators.required],
      dni: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  
save() {
    if (this.altaAlumno.invalid) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    const alumnoRegistrado: any = this.altaAlumno.value;

    this.alumnoRegistradoService.crearAlumnoRegistrado(alumnoRegistrado).subscribe(
      (res: any) => {
        Swal.fire('Alumno creado', '', 'success').then(() => {
          this.router.navigate(['/login']);
        });
      },
    );
  }
} 

