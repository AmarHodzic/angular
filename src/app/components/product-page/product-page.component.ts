import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  categoryId:number;
  products:Product[];
  prodVal: any[]
  backup = 'https://www.borri.it/wp-content/uploads/2020/08/Borri_UPS_medical_equipment.jpg'
  
  auth:boolean;

  constructor(private authService:AuthService,private router:Router, private route:ActivatedRoute,private productService:ProductsService, private cartService: CartService, private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.authService.authenticated.subscribe(auth => this.auth = auth)
    this.route.params.subscribe((params: Params) => {
      this.categoryId = params['id']; // same as :username in route
      if(this.categoryId==undefined){
        this.productService.getProductsByPage(0).subscribe(products=>{
          this.products = products
          for(let i = 0; i<this.products.length; i++){
            this.checkImage(this.products[i].images[0], ()=>{console.log('')}, ()=>{
              this.products[i].images[0] = this.backup
            })
          }
          this.prodVal =  products.map(item=>1)
          this.productService.getProductCount().subscribe(count=>{
            this.productService.setCount(count)
          })
        })
      }else{
        this.categoryService.getCategoryByIdAndPage(this.categoryId,0).subscribe(products=>{
          this.products = products
          for(let i = 0; i<this.products.length; i++){
            this.checkImage(this.products[i].images[0], ()=>{console.log('')}, ()=>{
              this.products[i].images[0] = this.backup
            })
          }
          this.prodVal = this.products.map(item=>1)
          this.categoryService.getProductCountForCategory(this.categoryId).subscribe(count=>{
            this.productService.setCount(count)
          })
        })
      }
    })
  }

  checkImage(src, good, bad) {
    var img = new Image();
    img.onload = good
    img.onerror = bad
    img.src = src
  }

  handleAdd(event,product,val){
    event.preventDefault() 
    if(this.auth){
      this.cartService.addToCart(product,val)
    }else{
      this.router.navigate(['/login'])
    }
  }
  
  
  fetchNewPage(evt){
    if(this.categoryId==undefined)
      this.productService.getProductsByPage(evt).subscribe(prod => this.products = prod)
    else{
      this.categoryService.getCategoryByIdAndPage(this.categoryId, evt).subscribe(prod => this.products = prod)
    }
  }

  checkMax(event,prodId) {
    for(let i = 0; i<this.products.length; i++){

      if(this.products[i].id==prodId){
        if (event.target.value > this.products[i].quantity && event.keyCode !== 46 && event.keyCode !== 8 ) {
          event.preventDefault(); 
          event.target.value = this.products[i].quantity
        }
      }
    }
  }
}
