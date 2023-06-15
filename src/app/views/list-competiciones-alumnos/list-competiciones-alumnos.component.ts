import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Competicion } from 'src/app/interfaces/competicion'; 
import { CompeticionesService } from 'src/app/services/competiciones.service';

@Component({
  selector: 'app-list-competiciones-alumnos',
  templateUrl: './list-competiciones-alumnos.component.html',
  styleUrls: ['./list-competiciones-alumnos.component.css']
})
export class ListCompeticionesAlumnosComponent {

  Competicion: Competicion[] = [];
  loading: boolean = true;
  page: number = 1;

  constructor(private competicionService: CompeticionesService) {}

  ngOnInit(): void {
    this.getAllCompeticiones();
  }

  getAllCompeticiones() {
    this.competicionService.obtenerTodasLasCompeticiones().subscribe(
      (resp: any) => {
        this.Competicion = resp;
        this.loading = false;
      },
      (error: any) => {
        Swal.fire('Error', 'No se han podido cargar las competiciones', 'error');
      }
    );
  }

  delete(nombreCompeticion: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará la competición con nombre: ${nombreCompeticion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.competicionService.eliminarCompeticion(nombreCompeticion).subscribe(
          () => {
            Swal.fire('Competicion eliminada', '', 'success');
            this.getAllCompeticiones(); // Actualizar la lista después de eliminar la competición
          },
          (error) => {
            Swal.fire('Error', 'No se pudo eliminar la competición', 'error');
          }
        );
      }
    });
  }
}
