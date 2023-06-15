import { Component, OnInit } from '@angular/core';
import { Competicion } from 'src/app/interfaces/competicion';
import { CompeticionesService } from 'src/app/services/competiciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-competiciones',
  templateUrl: './mis-competiciones.component.html',
  styleUrls: ['./mis-competiciones.component.css']
})
export class MisCompeticionesComponent implements OnInit {

  Competicion: Competicion[] = [];
  loading: boolean = true;
  page: number = 1;

  constructor(private competicionesService: CompeticionesService) {
    Swal.showLoading();
  }

  ngOnInit(): void {
    this.getAllCompeticiones();
  }

  getAllCompeticiones() {
    Swal.showLoading();
    const token = sessionStorage.getItem('token');

    if (token) {
      const tokenData = JSON.parse(token);
      const dni = tokenData.dni;

      if (dni !== null) {
        this.competicionesService.obtenerCompeticionPorAlumno(dni).subscribe(
          (resp: any) => {
            this.Competicion = resp;
            this.loading = false;
            Swal.hideLoading();
            Swal.close();
          },
          (error: any) => {
            alert('No se han podido cargar las competiciones');
            Swal.hideLoading();
            Swal.close();
          }
        );
      }
    }
  }
}