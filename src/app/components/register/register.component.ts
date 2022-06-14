import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserCredentials } from 'src/app/models/UserCredentials';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  fullName:string;
  username:string;
  password:string;
  validation:any = {}

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.fullName=''
    this.username=''
    this.password=''
  }

  val(){
    let isValid = true
    if(this.fullName == ''){
      this.validation.fullname = 'Please enter your name'
      isValid = false
    }else{
      this.validation.fullname = ''
    }

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
      // (?=.*[0-9])
      this.validation.password = 'Password enter atleast 8 characters'
      isValid = false
    }
    return isValid
  }

  register(){
    if(this.val()){
      let uc:User = {name:this.fullName, username:this.username, password:this.password, type:'customer', createdOn:(new Date), updatedOn:(new Date),orders:[]}
      this.auth.register(uc).subscribe((res)=>{
      })
      this.username = ''
      this.password = ''
      this.fullName = ''
      this.validation.fullName = ''
      this.validation.username = ''
      this.validation.password = ''
    }
  }
}
