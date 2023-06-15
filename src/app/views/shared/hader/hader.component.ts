import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-hader',
  templateUrl: './hader.component.html',
  styleUrls: ['./hader.component.css']
})
export class HaderComponent {
  dni!: string;
  role!: string; 

  constructor(
    private LoginService : LoginService,
    private router:Router,
  ) { }

    ngOnInit(): void{
      
    }

    getRole() {
      const token  = sessionStorage.getItem('token');
      
      if(token){
        const tokenData = JSON.parse(token);

        const role = tokenData.role

        
        if( role == "alumno")
        return null;
        else {
          return role;
        }

      }
    }

    logOut(){
      this.LoginService.logOut();
    }

    isLoginPage(){
     return this.LoginService.isLoginPage();
    }

    isSinUrl(){
     if(this.router.url == "/"){
      return true;
     } else {
      return false;
     }
    }

    isFormualrioPage(){
      return this.LoginService.isFormualrioPage();
    }
}
