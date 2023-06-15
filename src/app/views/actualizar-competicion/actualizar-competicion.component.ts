import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Competicion } from 'src/app/interfaces/competicion';
import { CompeticionesService } from 'src/app/services/competiciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-competicion',
  templateUrl: './actualizar-competicion.component.html',
  styleUrls: ['./actualizar-competicion.component.css']
})
export class ActualizarCompeticionComponent implements OnInit {
  competicion!: Competicion;
  updateCompeticionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private competicionService: CompeticionesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.updateCompeticionForm = this.fb.group({
      nombreCompeticion: ['', Validators.required],
      numeroJugadores: [5, Validators.required],
      fechaFin: [new Date(), Validators.required],
      fechaInicio: [new Date(), Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCompeticion();
  }

  getCompeticion() {
    this.competicionService
      .obtenerCompeticionPorNombre(this.route.snapshot.params['competicion'])
      .subscribe({
        next: (resp) => {
          this.updateCompeticionForm.setValue({
            nombreCompeticion: resp.nombreCompeticion,
            numeroJugadores: resp.numeroJugadores,
            fechaFin: resp.fechaFin,
            fechaInicio: resp.fechaInicio,
          });
          this.competicion = resp;
          Swal.close();
        },
        error: () => {
          Swal.fire('Error', 'No se pudo cargar la competición', 'error');
          Swal.hideLoading();
        }
      })
  }

  save() {
    if (this.updateCompeticionForm.invalid) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }
    
    const competicionData = this.updateCompeticionForm.value;
    
    this.competicionService
      .actualizarCompeticion(this.route.snapshot.params['competicion'], competicionData)
      .subscribe({
        next: () => {
          Swal.fire('Competicion Actualizada', '', 'success').then(() => {
            this.router.navigate(['/listCompeticionesAlumnos']);
          });
        },
        error: () => {
          Swal.fire('Error', 'No se ha podido actualizar la competición', 'error');
        },
      })
  }
}