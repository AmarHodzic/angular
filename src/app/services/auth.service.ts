import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { UserCredentials } from '../models/UserCredentials';
import { config } from '../config';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = new BehaviorSubject<boolean>(false);
  authenticated = this.auth.asObservable();

  private userData = new BehaviorSubject<string>(null);
  userType = this.userData.asObservable()


  constructor(private http:HttpClient, private router:Router) { }

  setAuth(){
    this.auth.next(this.isAuthenticated())
    this.userData.next(this.getUserType())
  }

  login(user:UserCredentials){
    // to do:
    // this.http.post<string>(`${config.url}/register`,user).subscribe(token=>{
    //   this.setAuthToken(token)
    // })

    this.http.get<User[]>(`${config.url}/Users`).subscribe(users=>{
      for(let userFromDB of users){
        if(userFromDB.username==user.username && userFromDB.password==user.password){
          this.setAuthToken('ulogovan')
          this.setUserType(userFromDB)
          //
          if(userFromDB.type == 'admin')
            this.router.navigate(['/admin/adminPage'])
          else
            this.router.navigate(['/'])
        }
      }
      this.setAuth(); 
    })
  }
  
  register(user:User){ 
    //   SHOULD BE HANDLED ON BACKEND 
      user.type = "customer"
      user.createdOn = new Date()
      user.updatedOn = new Date()
    //

    return this.http.post<User>(`${config.url}/Users`,user);
    // to do:
  }

  logout(){
    // handle redirection?
    this.clearAuthToken();
    this.clearUserType()
    this.router.navigate(['/'])
    this.setAuth()
  }

  isAuthenticated(){
    // to do:
    return this.getAuthToken()!=null
  }

  setAuthToken(token:string){
    localStorage.setItem('token',token)
  }

  getAuthToken(){
    return localStorage.getItem('token')
  }

  clearAuthToken(){
    localStorage.removeItem('token')
  }


  setUserType(user:User){
    localStorage.setItem('user-type',user.type)
  }

  getUserType(){
    return localStorage.getItem('user-type')
  }

  clearUserType(){
    localStorage.removeItem('user-type')
  }
}
