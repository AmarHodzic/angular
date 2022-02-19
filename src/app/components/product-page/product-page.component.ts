import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
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
  // @ViewChild() 

  constructor(private route:ActivatedRoute,private productService:ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
    
    this.route.params.subscribe((params: Params) => {
      this.categoryId = params['id']; // same as :username in route
      console.log(this.categoryId)
      if(this.categoryId==undefined){
        this.productService.getProducts().subscribe(products=>{
          this.products = products
          this.productService.setCount(this.products.length)
          this.prodVal =  products.map(item=>1)
        })
      }else{
        this.productService.getProductsByCategoryId(this.categoryId).subscribe(products=>{
          this.products = products.filter(product=>product.catId==this.categoryId)
          console.log(this.products)
          this.prodVal = products.map(item=>1)
        })
      }
    })
  }

  handleAdd(event,product,val){
    event.preventDefault()
    this.cartService.addToCart(product,val)
  }  
}
