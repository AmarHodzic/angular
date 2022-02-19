import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product:Product;
  auth:boolean;
  prodValue: any = 1;
  constructor(private authService:AuthService, private router:Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.authService.authenticated.subscribe(auth => this.auth = auth)
  }

  handleAdd(){
    if(this.auth){
      console.log('authentifikovan si, dodaj u cart')
      this.cartService.addToCart(this.product,this.prodValue)
    }else{
      this.router.navigate(['/login'])
    }
  }
  
}
