import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompeticionesService } from 'src/app/services/competiciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-competencia',
  templateUrl: './crear-competencia.component.html',
  styleUrls: ['./crear-competencia.component.css']
})
export class CrearCompetenciaComponent {


  constructor(
    private fb: FormBuilder,
    private CompeticionService: CompeticionesService,
    private router:Router,
  ) { this.anadirCompeticion = this.fb.group({
    nombreCompeticion: ['', Validators.required],
    numeroJugadores: [5, Validators.required],
    fechaFin: [new Date(), Validators.required],
    fechaInicio: [new Date(), Validators.required],
  });}

  anadirCompeticion!: FormGroup;
  nombreCompeticion!:String;
  numeroJugadores!:number;
  fechaFin!:Date;
  fechaInicio!:Date;

  save() {
    if (this.anadirCompeticion.invalid) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    const competicionData = this.anadirCompeticion.value;
    console.log(competicionData);

    this.CompeticionService.añadirUnaCompeticion(competicionData).subscribe({
      next: (res: any) => {
        Swal.fire('Competición Guardada', '', 'success').then(() => {
          this.router.navigate(['/listCompeticionesAlumnos']);
        });
      },
      error: () => {
        Swal.fire('Error', 'No se ha podido guardar la competición', 'error');
      },
    });
  }
}