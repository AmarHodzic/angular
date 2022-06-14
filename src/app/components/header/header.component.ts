import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
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

    this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {
          if(this.userType=='customer') {
            switch(event.url) {
              case '/admin/adminPage':
                this.router.navigate([''])
                break;
              case '/admin/table':
                this.router.navigate([''])
                break;
              case '/admin/categories':
                this.router.navigate([''])
                break;
              case '/admin/products':
                this.router.navigate([''])
                break;
              case '/admin/orders':
                this.router.navigate([''])
                break;
              case '/admin/addModal':
                this.router.navigate([''])
                break;
            }
          }
          if(this.userType==null) {
            switch(event.url) {
              case '/admin/adminPage':
                this.router.navigate([''])
                break;
              case '/admin/table':
                this.router.navigate([''])
                break;
              case '/admin/categories':
                this.router.navigate([''])
                break;
              case '/admin/products':
                this.router.navigate([''])
                break;
              case '/admin/orders':
                this.router.navigate([''])
                break;
              case '/admin/addModal':
                this.router.navigate([''])
                break;
              case '/cart':
                this.router.navigate([''])
                break;  
              case '/orders':
                this.router.navigate([''])
                break;    
            }
          }
      }


  });
    
    if(this.userType == 'admin'){
      this.router.navigate(['/admin/adminPage'])
    }
   
  }

  logout(){
    localStorage.setItem('cartItem', '')
    this.authService.logout()
  }

}
