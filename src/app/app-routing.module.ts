import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { CommonModule } from '@angular/common';
import { FormularioDeAltaComponent } from './views/formulario-de-alta/formulario-de-alta.component';
import { HomeComponent } from './views/home/home.component';
import { ListAlumnosCentroComponent } from './views/list-alumnos-centro/list-alumnos-centro.component';
import { AnadirAlumnoCentroComponent } from './views/anadir-alumno-centro/anadir-alumno-centro.component';
import { ActualizarAlumnoCentroComponent } from './views/actualizar-alumno-centro/actualizar-alumno-centro.component';
import { AlumnosPorRegistrarComponent } from './views/alumnos-por-registrar/alumnos-por-registrar.component';
import { PerfilComponent } from './views/perfil/perfil.component';
import { ListCompeticionesAlumnosComponent } from './views/list-competiciones-alumnos/list-competiciones-alumnos.component';
import { ActualizarCompeticionComponent } from './views/actualizar-competicion/actualizar-competicion.component';
import { MostrarResultadoFinalComponent } from './views/mostrar-resultado-final/mostrar-resultado-final.component';
import { CrearCompetenciaComponent } from './views/crear-competencia/crear-competencia.component';
import { MisCompeticionesComponent } from './views/mis-competiciones/mis-competiciones.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      bTitle: 'Login',
    },
  },
  {
    path: '',   
    component: LoginComponent,
    data: {
      bTitle: 'Login',
    },
  },
  {
    path: 'formulario',
    component: FormularioDeAltaComponent,
    data: {
      bTitle: 'Alta',
    },
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      bTitle: 'Home',
    },
  },
  {
    path: 'alumnosCentro',
    component: ListAlumnosCentroComponent,
    data: {
      bTitle: 'AlumnosCentro',
    }
  },
  {
    path: 'añadirAlumnoCentro',
    component: AnadirAlumnoCentroComponent,
    data: {
      bTitle: 'AñadirAlumnoCentro',
    }
  },
  {
    path: 'alumnosRegistrados',
    component: AlumnosPorRegistrarComponent,
    data: {
      bTitle: 'Alumnos Registrar',
    },
  },
  {
    path: 'actualizarAlumnoCentro/:alumnoCentro',
    component: ActualizarAlumnoCentroComponent,
    data: {
      bTitle: 'ActualizarCentro',
    },
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    data: {
      bTitle: 'Perfil',
    },
  },
  {
    path: 'listCompeticionesAlumnos',
    component: ListCompeticionesAlumnosComponent,
    data:{
      bTitle: 'ListaCompeticiones'
    }
  },
  {
    path: 'informacionResultado/:competicion',
    component: ActualizarCompeticionComponent,
    data: {
      bTitle: 'ActualizarCompeticion',
    },
  },
  {
    path: 'actualizarCompeticion/:nombrecompeticion',
    component: MostrarResultadoFinalComponent,
    data: {
      bTitle: 'ResultadoFinal',
    },
  },
  {
    path: 'añadirCompeticion',
    component: CrearCompetenciaComponent,
    data: {
      bTitle: 'AñadirCompeticion',
    },
  },
  {
    path: 'misCompeticiones',
    component: MisCompeticionesComponent,
    data: {
      bTitle: 'Mis Competiciones',
    },
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
