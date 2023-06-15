import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosCentro } from 'src/app/interfaces/alumnoCentro';
import { AlumnosCentroService } from 'src/app/services/alumnos-centro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-alumno-centro',
  templateUrl: './actualizar-alumno-centro.component.html',
  styleUrls: ['./actualizar-alumno-centro.component.css']
})
export class ActualizarAlumnoCentroComponent implements OnInit {
  AlumnoCentro!: AlumnosCentro;
  updateAlumnoCentroForm: FormGroup;

  constructor(
    private alumnoCentroService: AlumnosCentroService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.updateAlumnoCentroForm = this.fb.group({
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      clase: ['', Validators.required],
      role: [''],
    });
  }

  ngOnInit(): void {
    this.getAlumnoCentro();
  }

  getAlumnoCentro() {
    this.alumnoCentroService
      .obtenerUnAlumnosCentroMedianteDNI(this.route.snapshot.params['alumnoCentro'])
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.updateAlumnoCentroForm.setValue({
            dni: resp.dni,
            nombre: resp.nombre,
            apellidos: resp.apellidos,
            clase: resp.clase,
            role: resp.role,
          });
          this.AlumnoCentro = resp;
          Swal.close();
        },
        error: () => {
          Swal.fire('Error', 'No se pudo cargar el alumno', 'error');
          Swal.hideLoading();
        }
      });
  }

  save() {
    if (this.updateAlumnoCentroForm.invalid) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }
    
    const alumnoData = this.updateAlumnoCentroForm.value;
    console.log(alumnoData);
    
    this.alumnoCentroService
      .actualizarUnAlumnosCentroMedianteDNI(this.route.snapshot.params['alumnoCentro'], alumnoData)
      .subscribe({
        next: () => {
          Swal.fire('Alumno Actualizado', '', 'success').then(() => {
            this.router.navigate(['/alumnosCentro']);
          });
        },
        error: () => {
          Swal.fire('Error', 'No se ha podido actualizar al alumno', 'error');
        },
      });
  }
}