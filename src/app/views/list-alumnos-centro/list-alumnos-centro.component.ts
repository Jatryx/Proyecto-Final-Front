import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlumnosCentro } from 'src/app/interfaces/alumnoCentro';
import { AlumnosCentroService } from 'src/app/services/alumnos-centro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-alumnos-centro',
  templateUrl: './list-alumnos-centro.component.html',
  styleUrls: ['./list-alumnos-centro.component.css']
})
export class ListAlumnosCentroComponent implements OnInit {

  AlumnosCentro: AlumnosCentro[] = [];
  loading: boolean = true;
  page: number = 1;
  filtro: string = 'patata';
  filtroForm!: FormGroup;

  constructor(
    private AlumnosCentroService: AlumnosCentroService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getAllAlumnosCentro();
  }

  getAllAlumnosCentro() {
    this.AlumnosCentroService.obtenertodosAlumnosCentro().subscribe({
      next: (resp) => {
        this.AlumnosCentro = resp;
        this.loading = false;
      },
      error: (err) => {
        Swal.fire('Error', 'No se han podido cargar los alumnos', 'error');
      },
    });
  }

  delete(dni: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el alumno con DNI: ${dni}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.AlumnosCentroService.eliminarUnAlumnosCentroMedianteDNI(dni).subscribe(
          () => {
            Swal.fire('Alumno eliminado', '', 'success');
            this.getAllAlumnosCentro(); // Actualizar la lista después de eliminar el alumno
          },
          (error) => {
            Swal.fire('Error', 'No se pudo eliminar el alumno', 'error');
          }
        );
      }
    });
  }
}