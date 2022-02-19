import { Component, OnInit } from '@angular/core';
import { UserCredentials } from 'src/app/models/UserCredentials';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  login(){
    let uc:UserCredentials = {username:this.username,password:this.password}
    this.authService.login(uc)
  }

}
