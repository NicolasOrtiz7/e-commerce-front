import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  creds:any = {
    email: "",
    password: ""
  }


  constructor(
    private loginService:LoginService,
    private router:Router
  ){}

  login(form:NgForm){
    this.loginService.login(this.creds).subscribe(
      response => {
        this.router.navigate(['/'])
      }
    )
  }

}
