import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  miFormulario!: FormGroup;
  dni: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) {this.miFormulario = this.formBuilder.group({
    dni: ['', Validators.required],
    password: ['', Validators.required],
  });
}

logIn() {
  if (this.miFormulario.invalid) {
    Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
    return;
  }

  const formValues = this.miFormulario.value;
  const dni = formValues.dni;
  const password = formValues.password;

  Swal.fire({
    title: 'Iniciando sesión',
    text: 'Por favor, espera...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  this.loginService.loggear(dni).subscribe(
    (res: any) => {
      const storedPassword = res.password;

      if (password === storedPassword) {
        const role = res.role;

        if (res.estado !== 'no admitido') {
          const tokenData = {
            dni: dni,
            role: role
          };

          const tokenDataString = JSON.stringify(tokenData);

          sessionStorage.setItem('token', tokenDataString);

          Swal.close();
          this.router.navigate(['/home']);
        } else {
          Swal.close();
          Swal.fire('Acceso denegado', 'Por favor, espere hasta que sea admitido', 'error');
        }
      } else {
        Swal.close();
        Swal.fire('Acceso denegado', 'Contraseña incorrecta', 'error');
      }
    },
    (error: any) => {
      Swal.close();
      Swal.fire('Error', 'El DNI no existe', 'error');
    }
  );
}
}