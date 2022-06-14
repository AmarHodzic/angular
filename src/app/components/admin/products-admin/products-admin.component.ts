import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit {

  Headers = ['title','desc','images','price','quantity']
  Rows: any[];
  

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
     this.productsService.getProducts().subscribe(products=>{
       this.Rows = products;

     })
  }

  handleDeleteOfRow(event){
    this.productsService.deleteProductById(event).subscribe( res => {
      this.Rows = this.Rows.filter(ourRow=>ourRow.id!=event)  
    })
  }
}
