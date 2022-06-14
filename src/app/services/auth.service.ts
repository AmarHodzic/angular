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
  us: User;

  constructor(private http:HttpClient, private router:Router) { }

  setAuth(){
    this.auth.next(this.isAuthenticated())
    this.userData.next(this.getUserType())
  }

  login(user:UserCredentials){
    return this.http.post(`${config.url}/Users/authenticate`, JSON.stringify(user),{headers:{'Content-Type':'application/json'},responseType:'text'}) 
  }
  
  register(user:User){ 
    user.type = "customer"
    return this.http.post<User>(`${config.url}/Users`,user);
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

  setUserId(user:User){
    localStorage.setItem('user-id',user.id.toString())
  }

  getUserType(){
    return localStorage.getItem('user-type')
  }

  getUserId(){
    return localStorage.getItem('user-id')
  }

  getUserByUsername(username){
    return this.http.get<any>(`${config.url}/Users/username/${username}`)
  }

  clearUserType(){
    localStorage.removeItem('user-type')
  }
}
