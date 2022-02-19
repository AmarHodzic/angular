import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import { Category } from 'src/app/models/Category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  numbers = [0,1,2];
  products:Product[];
  categories:Category[]; 

  constructor(private productService:ProductsService, private categoriesService:CategoriesService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products=>{
      this.products = this.filterProducts(products)
    })

    this.categoriesService.getCategories().subscribe(categories =>{
      this.categories = this.filterCategories(categories)
    })
  } 

  filterProducts(products:Product[]){
    return products.slice(0,3)
  }

  filterCategories(categories:Category[]){
    return categories.slice(0,3)  
  }

}
