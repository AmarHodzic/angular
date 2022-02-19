import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/models/Product';
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

  constructor(private route:ActivatedRoute, private productService:ProductsService) { }
  ngDoCheck(){
    console.log('asd')
  }
  ngOnInit(): void {
    this.test = false
    console.log('asd')
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']; // same as :username in route
      console.log(this.id)

      // Napravi metodu getProductById
      this.productService.getProducts().subscribe(products=>{
        this.product = products.filter(product=>product.id==this.id)[0];
        this.startingImg = this.product.images[0]
        this.observedProduct = this.product.images
        setTimeout(()=>{
          this.test = true
        },1000)
      })
  });
  }

  nextImg(){
    if(this.x >= this.observedProduct.length-1){
      this.x = -1  
    }
    this.x = this.x + 1;
    console.log(this.x);
    this.startingImg = this.observedProduct[this.x]
    
  }

  prevImg(){
    if(this.x <= 0){
      this.x = this.observedProduct.length;
    }
    this.x = this.x - 1;
    console.log(this.x);
    this.startingImg = this.observedProduct[this.x]
    
  }
}
