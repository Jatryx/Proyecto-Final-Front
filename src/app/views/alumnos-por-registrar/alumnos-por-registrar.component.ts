import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlumnoRegistrado } from 'src/app/interfaces/alumnoRegistrado';
import { AlumnosCentro } from 'src/app/interfaces/alumnoCentro';
import { AlumnosCentroService } from 'src/app/services/alumnos-centro.service';
import { AlumnosRegistradosService } from 'src/app/services/alumnos-registrados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos-por-registrar',
  templateUrl: './alumnos-por-registrar.component.html',
  styleUrls: ['./alumnos-por-registrar.component.css']
})
export class AlumnosPorRegistrarComponent implements OnInit{

  AlumnoCentro!: AlumnosCentro ;
  UnAlumnoRegistrado!: AlumnoRegistrado;
  AlumnosRegistrado: AlumnoRegistrado[] = [];
  loading: boolean =true;
  page: number = 1;
  filtroForm!: FormGroup;
  filtro: string = 'patata';

  constructor(
    private AlumnosRegistradoService: AlumnosRegistradosService,
    private AlumnoCentroService: AlumnosCentroService,
    private fb: FormBuilder,
  ) {
    Swal.showLoading();
  }

  getRole(){
    const token = sessionStorage.getItem('token');
    if(token){
      const tokenData = JSON.parse(token);
      const role = tokenData?.role;
      console.log(role);
      return role;
    }
  }

  ngOnInit(): void {
    this.getAllAlumnosRegistrado();
    this.getRole();
    this.filtroForm = this.fb.group({
      filtro: ['']
    });
  }

  getAllAlumnosRegistrado() {
    this.AlumnosRegistradoService.obtenerTodosLosAlumnosRegistrado().subscribe({
      next: (resp) => {
        const a = resp;
        const filtroAdmitido = 'admitido';
        const alumnosFiltrados = a.filter(alumno => alumno.estado === filtroAdmitido);
        this.AlumnosRegistrado = resp;
        this.loading = false;
        Swal.close();
      },
      error: (err) => {
        Swal.fire('Error', 'No se han podido cargar los Alumnos', 'error');
        Swal.hideLoading();
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
        this.AlumnosRegistradoService.eliminarAlumnoRegistradoMedianteDNI(dni).subscribe({
          next: (resp) => {
            Swal.fire('Alumno eliminado', '', 'success');
          },
          error: (err) => {
            Swal.fire('Error', 'El alumno no se puede eliminar ya que está apuntado en una competición', 'error');
          }
        });
      }
    });
    this.FiltrarAdmitido;
  }

  aceptarAlumno(dni: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se aceptará el alumno con DNI: ${dni}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.AlumnoCentroService.obtenerUnAlumnosCentroMedianteDNI(dni).subscribe(
          (alumnoCentro) => {
            this.AlumnosRegistradoService.obtenerAlumnoRegistradoMedianteDNI(dni).subscribe((alumnoRegistrado) => {
              if (
                alumnoCentro.dni === alumnoRegistrado.dni &&
                alumnoCentro.clase === alumnoRegistrado.clase &&
                alumnoCentro.nombre === alumnoRegistrado.nombre &&
                alumnoCentro.apellidos === alumnoRegistrado.apellidos &&
                alumnoCentro.role === alumnoRegistrado.role
              ) {
                this.AlumnosRegistradoService.admitirAlumnoRegistradoMedianteDNI(dni, 'algo').subscribe(() => {
                  Swal.fire('Alumno aceptado', '', 'success');
                });
              } else {
                Swal.fire('Error', 'El alumno no se encuentra en la base de datos', 'error');
              }
            });
          },
          (error) => {
            Swal.fire('Error', 'No se encuentra en el centro  ', 'error');
          }
        );
      }
    });
    this.FiltrarAdmitido;
  }

  FiltrarAdmitido(admitido:String){
   this.AlumnosRegistradoService.obtenerEstado(admitido).subscribe(
    (resp: any) => {
      if (Array.isArray(resp)) {
        this.AlumnosRegistrado = resp.map((alumnoRegistrado: AlumnoRegistrado) => {
          return alumnoRegistrado;
        });

    
      } 
    }
   )
  }

  Filtrar(){
    this.filtro = this.filtroForm.get('filtro')?.value;
    this.AlumnosRegistradoService.obtenerAlumnoRegistradoMedianteDNI(this.filtro).subscribe(
      (resp: any) => {
        if(Array.isArray(resp)) {
          this.AlumnosRegistrado = resp.map((alumnosRegistrado: AlumnoRegistrado) => {
            return alumnosRegistrado;
          });
        } else if (typeof resp === 'object') {
          this.AlumnosRegistrado = [resp];
        } else {
          this.AlumnosRegistrado = [];
        }
      },
      (error: any) => {
        alert("Un error inesperado");
      }
    )
  }
}
