import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Output() pageEvent = new EventEmitter<number>();
  i:number = 1;
  max:number = 8;

  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
    this.productService.counter.subscribe(counter=>this.max = Math.ceil(counter/8))
  }

  next(evt){
    evt.preventDefault()    
    if(this.i<this.max){
      this.i++;
      this.pageEvent.emit(this.i)
    }
  }

  previous(evt){
    
    evt.preventDefault()
    if(this.i>1){
      this.i--;
      this.pageEvent.emit(this.i)
    }
  }
}
