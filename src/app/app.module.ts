import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormularioDeAltaComponent } from './views/formulario-de-alta/formulario-de-alta.component';
import { HomeComponent } from './views/home/home.component';
import { HaderComponent } from './views/shared/hader/hader.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormularioDeAltaComponent,
    HomeComponent,
    HaderComponent,
    ListAlumnosCentroComponent,
    AnadirAlumnoCentroComponent,
    ActualizarAlumnoCentroComponent,
    AlumnosPorRegistrarComponent,
    PerfilComponent,
    ListCompeticionesAlumnosComponent,
    ActualizarCompeticionComponent,
    MostrarResultadoFinalComponent,
    CrearCompetenciaComponent,
    MisCompeticionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
