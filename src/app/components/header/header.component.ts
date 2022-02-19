import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  auth:boolean;
  userType:string;
  faShoppingCart = faShoppingCart;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.authService.setAuth()
    this.authService.authenticated.subscribe(auth=>this.auth = auth)
    this.authService.userType.subscribe(userType=>this.userType = userType)

    if(this.userType == 'admin'){
      console.log('hello?')
      this.router.navigate(['/admin/adminPage'])
    }
  }

  logout(){
    this.authService.logout()
  }

}
