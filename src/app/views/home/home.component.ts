import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlumnoRegistrado } from 'src/app/interfaces/alumnoRegistrado';
import { Competicion } from 'src/app/interfaces/competicion';
import { AlumnosRegistradosService } from 'src/app/services/alumnos-registrados.service';
import { CompeticionesService } from 'src/app/services/competiciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  AlumnoRegistroActual!: AlumnoRegistrado;
  competiciones: Competicion[] = [];
  alumnos: AlumnoRegistrado[] = [];
  filtro: string = 'patata';
  filtroForm!: FormGroup;

  constructor(
    private competicionService: CompeticionesService,
    private fb: FormBuilder,
    private alumnoRegistradoService: AlumnosRegistradosService
  ) {}

  ngOnInit() {
    this.filtroForm = this.fb.group({
      filtro: ['']
    });

    this.getRole();

    this.competicionService.obtenerTodasLasCompeticiones().subscribe(
      (resp: any) => {
        this.competiciones = resp.map((competicion: Competicion) => {
          return competicion;
        });
      },
      (error: any) => {
        alert("Un error inesperado");
      }
    );

    this.resize();
  }

  getRole() {
    const token = sessionStorage.getItem('token');

    if (token) {
      const tokenData = JSON.parse(token);
      const role = tokenData.role;

      if (role == "profesor" || role == "admin") {
        return role;
      } else {
        return null;
      }
    }
  }

  getDNI() {
    const token = sessionStorage.getItem('token');

    if (token) {
      const tokenData = JSON.parse(token);
      const dni = tokenData.dni;

      return dni;
    }
  }

  Filtrar() {
    this.filtro = this.filtroForm.get('filtro')?.value;
    this.competicionService.obtenerCompeticionPorNombre(this.filtro).subscribe(
      (resp: any) => {
        console.log(resp);
        
        if (Array.isArray(resp)) {
          this.competiciones = resp.map((competicion: Competicion) => {
            return competicion;
          });
        } else if (typeof resp === 'object') {
          this.competiciones = [resp];
        } else {
          this.competiciones = [];
        }
      },
      (error: any) => {
        alert("Un error inesperado");
      }
    );
  }

  resize() {
    let competicionesContainer = document.getElementById('competicionesContainer');

    if (competicionesContainer) {
      competicionesContainer.style.height = (window.innerHeight * 47) / 100 + 'px';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resize();
  }

  anadirParticipante(nombreCompeticion: string) {
    let dni = this.getDNI();
    let alumno: AlumnoRegistrado;
    this.alumnoRegistradoService.obtenerAlumnoRegistradoMedianteDNI(dni).subscribe({
      next: (alumnoObtenido) => {
        alumno = alumnoObtenido;
        
        this.competicionService.asignarUnAlumnoAUnaCompeticion(nombreCompeticion, alumno).subscribe({
          next: (resp) => {
            Swal.fire('Participante añadido', '', 'success');
          },
          error: (err) => {
            Swal.fire('Error', 'No se pudo añadir el participante', 'error');
          }
        });
      },
      error: (error) => {
        Swal.fire('Error', 'No se pudo obtener el alumno registrado', 'error');
      },
    });
  }

}