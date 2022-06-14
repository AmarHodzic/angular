import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css']
})
export class ProductPreviewComponent implements OnInit {
  id:number;
  test:boolean;
  product:Product;
  observedProduct:any[] = [];
  startingImg:string;
  x:number = 0;
  prodValue: any = 1;
  auth:boolean;
  backup='https://www.borri.it/wp-content/uploads/2020/08/Borri_UPS_medical_equipment.jpg'

  constructor(private router: Router, private cartService:CartService, private authService:AuthService, private route:ActivatedRoute, private productService:ProductsService) { }
  ngDoCheck(){
  }
  ngOnInit(): void {

    this.authService.authenticated.subscribe(auth => this.auth = auth)
    this.test = false
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']; // same as :username in route

      this.productService.getProducts().subscribe(products=>{
        this.product = products.filter(product=>product.id==this.id)[0];
        this.startingImg = this.product.images[0]
        this.checkImage(this.startingImg, ()=>{console.log('')}, ()=>{
          this.startingImg = this.backup
          this.observedProduct[0] = this.backup
        })
        this.observedProduct = this.product.images
        setTimeout(()=>{
          this.test = true
        },1000)
      })
  });
  }

  checkImage(src, good, bad) {
    var img = new Image();
    img.onload = good
    img.onerror = bad
    img.src = src
  }

  nextImg(){
    if(this.x >= this.observedProduct.length-1){
      this.x = -1  
    }
    this.x = this.x + 1;
    this.startingImg = this.observedProduct[this.x]
    
  }

  prevImg(){
    if(this.x <= 0){
      this.x = this.observedProduct.length;
    }
    this.x = this.x - 1;
    this.startingImg = this.observedProduct[this.x]
    
  }

  handleAdd(){
    if(this.auth){
      this.cartService.addToCart(this.product,this.prodValue)
    }else{
      this.router.navigate(['/login'])
    }
  }

  checkMax(event) {
    if (event.target.value > this.product.quantity && event.keyCode !== 46 && event.keyCode !== 8 ) {
      event.preventDefault();
      event.target.value = this.product.quantity
    }
  }
}
