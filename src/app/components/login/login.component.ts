import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  validation:any = {}
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.username=''
    this.password=''
  }


  val(){
    let isValid = true
   
    if(this.username==''){
      this.validation.username = 'Please enter username'
      isValid = false
    }
    else if(this.username?.length < 3) {
      this.validation.username = 'Please enter atleast 3 chars'
      isValid = false
    }else {
      this.validation.username= ''
    }

    if(this.password==''){
      this.validation.password = 'Please enter password'
      isValid = false
    }
    else if(this.password?.length < 8 ) {
      this.validation.password = 'Password enter atleast 8 characters'
      isValid = false
    }
    return isValid
  }

  login(){
    this.validation.userPassword = ''
    this.validation.wrongPassword = ''
    if(this.val()){
      let uc:UserCredentials = {username:this.username,password:this.password}
      this.authService.login(uc).subscribe(test=>{
        this.authService.setAuthToken(test)
        this.authService.getUserByUsername(uc.username).subscribe(resp=>{
          
          if(this.authService.isAuthenticated){
            this.authService.setUserType(resp)
            this.authService.setUserId(resp)
            if(resp.type == 'admin'){
              this.router.navigate(['/admin/adminPage'])
            }
            else
              this.router.navigate(['/'])
          }
          
          this.authService.setAuth();
        })
        
        },
        err=>{
          if(err.status=='404') {
            this.validation.userPassword = 'Wrong user or password'
          }else{
            this.validation.wrongPassword = 'Wrong password'
          }
        })
      
      this.username = ''
      this.password = ''
      this.validation.username = ''
      this.validation.password = ''
      this.validation.userPassword = ''
      this.validation.wrongPassword = ''
    }
  }

}
