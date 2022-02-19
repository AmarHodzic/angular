import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit {

  Headers = ['title','desc','images','price','quantity','catId','updateddate','createddate']
  // Rows = [
  //   {'Title':'nekititle1','Desc':'nekides1','Images':'URLNEKI','Price':350,'Quantity':5,'CatId':2,'updateddate':'dateNeki','createddate':'ALOOOOO'},   
  //   {'Title':'nekititle2','Desc':'nekides1','Images':'URLNEKI','Price':350,'Quantity':5,'CatId':2,'updateddate':'dateNeki','createddate':'ALOOOOO'},
  //   {'Title':'nekititle3','Desc':'nekides1','Images':'URLNEKI','Price':350,'Quantity':5,'CatId':2,'updateddate':'dateNeki','createddate':'ALOOOOO'},
  //   {'Title':'nekititle4','Desc':'nekides1','Images':'URLNEKI','Price':350,'Quantity':5,'CatId':2,'updateddate':'dateNeki','createddate':'ALOOOOO'},
  //   {'Title':'nekititle5','Desc':'nekides1','Images':'URLNEKI','Price':350,'Quantity':5,'CatId':2,'updateddate':'dateNeki','createddate':'ALOOOOO'},
  // ]

  Rows: any[];
  

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
     this.productsService.getProducts().subscribe(products=>{
       this.Rows = products;
      console.log(this.Rows);

     })
  }

  handleDeleteOfRow(event){
    // console.log('helo?')
    // console.log(event)
    // this.Rows = this.Rows.filter(ourRow=>ourRow.Title!=event.Title)
  }
}
