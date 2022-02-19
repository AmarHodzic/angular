import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers:[DatePipe]
})
export class TableComponent implements OnInit {
  // komunikacija od parenta > childrenu input
  // komunikacija od childrena > parentu output
  @Output() deleteEvent = new EventEmitter<any>()
  @Input() headers: any;
  @Input() rows: any;

  listaColCat = ['Title:', 'Desc:', 'Image url:']
  listaColPrd = ['Title:', 'Desc:', 'Images:', 'Price:', 'Quantity:', 'CatId:']
  
  currentDate = ''
  trenutnaRuta: string;
  // curDateString = '';
  
  constructor(private router:Router, private datePipe: DatePipe) { 
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    // console.log(this.curDateString)
  }

  ngOnInit(): void {
    this.trenutnaRuta = this.router.url
  }

  onDelete(row){
    console.log("deleted");
    this.deleteEvent.emit(row)
  }

  addCategoryToTable(){
    console.log("DODAT ITEM");
  }

  handleAdd(event){
    console.log(this.trenutnaRuta);
    if(this.trenutnaRuta == '/admin/categories')
      this.rows.push({'id':this.rows.length+1,'title':event.title,'desc':event.desc,'updateddate':'//','createddate':this.currentDate})
    else{
      console.log("Hehe");
      this.rows.push({'Title':event.title,'Desc':event.desc,'Images':event.images,'Price':event.price,'Quantity':event.quantity,'CatId':event.catId,'updateddate':'//','createddate':this.currentDate})    
    }
      console.log(this.rows);
  
    // this.categoriesService.createCategory(event)
  }
}
