import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoRegistrado } from 'src/app/interfaces/alumnoRegistrado';
import { Competicion } from 'src/app/interfaces/competicion';
import { ResultadoFinal } from 'src/app/interfaces/resultadoFinal';
import { AlumnosRegistradosService } from 'src/app/services/alumnos-registrados.service';
import { CompeticionesService } from 'src/app/services/competiciones.service';
import { ResultadoFinalService } from 'src/app/services/resultado-final.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-resultado-final',
  templateUrl: './mostrar-resultado-final.component.html',
  styleUrls: ['./mostrar-resultado-final.component.css']
})
export class MostrarResultadoFinalComponent {

  resultadoFinal!: ResultadoFinal;
  loading: boolean = true;
  page: number = 1;
  fechaFin!: Date;
  competicion!: String;
  ganadorCompetencia!: String;
  alumnosCompetidores!: Competicion;
  AlumnoGanador!:AlumnoRegistrado;
  

  constructor(
    private resultadoFinalService: ResultadoFinalService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private competicionService: CompeticionesService,
    private AlumnoRegistradoService: AlumnosRegistradosService,
  ) {}

  resultadoFinalList = this.fb.group({
    competicion: '',
    ganadorCompetencia: '',
    fechaFin: new Date(),
  });

  ngOnInit(): void {
    this.getAllResultadosFinales();
    this.getCompeticion();

    fechaFin: this.alumnosCompetidores.fechaFin;
  }

  getAllResultadosFinales() {
    Swal.showLoading();
    this.resultadoFinalService.obtenerResultadoPorNombreCompeticion(this.route.snapshot.params['nombrecompeticion']).subscribe(
      (resp: any) => {
        console.log(resp);
        this.resultadoFinalList.setValue({
          competicion: resp.competicion.nombreCompeticion,
          ganadorCompetencia: resp.ganadorCompetencia.dni + ' con el nombre ' + resp.ganadorCompetencia.nombre,
          fechaFin: resp.fechaFin,
        });
        this.resultadoFinal = resp;
        this.loading = false;
        Swal.hideLoading();
        Swal.fire({
          title: '¡Carga completada!',
          text: 'Se ha cargado el resultado de la competicio exitosamente',
          icon: 'success',
        });
      },
      (error: any) => {
        Swal.hideLoading();
        Swal.fire({
          title: 'Error',
          text: 'No tiene resultado final la competicion',
          icon: 'error',
        });
      }
    );
  }

  getCompeticion() {
    this.competicionService.obtenerCompeticionPorNombre(this.route.snapshot.params['nombrecompeticion']).subscribe(
      (resp: any) => {
        this.alumnosCompetidores = resp;
      }
    );
  }

  delete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.resultadoFinalService.obtenerResultadoPorNombreCompeticion(this.route.snapshot.params['nombrecompeticion']).subscribe(
          (resp: any) => {
            console.log(resp);
            Swal.showLoading();
            this.resultadoFinalService.eliminarMedianteId(resp.id).subscribe(
              () => {
                Swal.fire(
                  '¡Borrado!',
                  'El resultado final ha sido eliminado.',
                  'success'
                );
                this.router.navigate(['/listCompeticionesAlumnos']);
              },
              (error: any) => {
                Swal.fire(
                  'Error',
                  'No se pudo eliminar el resultado final.',
                  'error'
                );
              }
            );
          },
          (error: any) => {
            Swal.fire(
              'Error',
              'No se pudieron obtener los detalles del resultado final.',
              'error'
            );
          }
        );
      }
    });
  }

  competicionVacia!:Competicion;
  introducir!:ResultadoFinal;
  ganador(dni: string) {
    console.log(dni);
    console.log(this.introducir);
    this.fechaFin = new Date(this.alumnosCompetidores.fechaFin);
  
    this.AlumnoRegistradoService.obtenerAlumnoRegistradoMedianteDNI(dni).subscribe(
      (resp) => {
        this.introducir = {
          id: '1',
          resultado: "Ganador",
          fechaFin: this.alumnosCompetidores.fechaFin,
          competicion: this.competicionVacia,
          ganadorCompetencia: resp
        };
        console.log(this.introducir);
      }
    );

    Swal.fire({
      title: 'Añadir Ganador',
      text: '¿Estás seguro de añadir este ganador?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, añadir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.showLoading();
        
        this.resultadoFinalService.añadirUnResultadoFinaldeUnGanador(this.route.snapshot.params['nombrecompeticion'], dni,this.introducir ).subscribe(
          () => {
            Swal.fire(
              '¡Ganador añadido!',
              'Se ha añadido el ganador exitosamente.',
              'success'
            ).then(() => {
              this.router.navigate(['/listCompeticionesAlumnos']);
            });
          },
          (error: any) => {
            Swal.fire(
              'Error',
              'No se pudo añadir el ganador.',
              'error'
            );
          }
        );
      }
    });
  }
}