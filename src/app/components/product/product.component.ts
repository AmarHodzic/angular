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
  backup = 'https://www.borri.it/wp-content/uploads/2020/08/Borri_UPS_medical_equipment.jpg'
   
  auth:boolean;
  prodValue: any = 1;
  constructor(private authService:AuthService, private router:Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.authService.authenticated.subscribe(auth => this.auth = auth)

    this.checkImage(this.product.images[0], ()=>{console.log('')}, ()=>{
      this.product.images[0]= this.backup
    })
  }

  handleAdd(){
    if(this.auth){
      this.cartService.addToCart(this.product,this.prodValue)
    }else{
      this.router.navigate(['/login'])
    }
  }
  checkImage(src, good, bad) {
    var img = new Image();
    img.onload = good
    img.onerror = bad
    img.src = src
  }

  checkMax(event) {
    if (event.target.value > this.product.quantity && event.keyCode !== 46 && event.keyCode !== 8 ) {
      event.preventDefault();
      event.target.value = this.product.quantity
      this.prodValue = event.target.value
    }
  }
}
