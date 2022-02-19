import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories-admin.component.html',
  styleUrls: ['./categories-admin.component.css']
})
export class CategoriesAdminComponent implements OnInit {

  Headers = ['id','title','desc','updateddate','createddate']
  Rows = [
    {'id':1,'title':'nekititle1','desc':'nekides1','updateddate':'dateNeki','createddate':'ALOOOOO'},
    {'id':2,'title':'nekititle2','desc':'nekides1','updateddate':'dateNeki','createddate':'ALOOOOO'},
    {'id':3,'title':'nekititle3','desc':'nekides1','updateddate':'dateNeki','createddate':'ALOOOOO'},
    {'id':4,'title':'nekititle4','desc':'nekides1','updateddate':'dateNeki','createddate':'ALOOOOO'},
    {'id':5,'title':'nekititle5','desc':'nekides1','updateddate':'dateNeki','createddate':'ALOOOOO'},
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

  handleDeleteOfRow(event){
    this.Rows = this.Rows.filter(ourRow=>ourRow.id!=event.id)
  }
  
  // handleAdd(event){
  //   console.log('hello???')
  //   console.log(event)
  // }
}
