import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from 'src/app/services/categories.service';
import { OrdersServiceService } from 'src/app/services/orders-service.service';
import { ProductsService } from 'src/app/services/products.service';

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
  @Output() cancelEvent = new EventEmitter<any>()
  @Output() shipEvent = new EventEmitter<any>()
  @Output() deliverEvent = new EventEmitter<any>()
  @Input() headers: any;
  @Input() rows: any;
  @Input() error500: any;
  @Input() isDisabled: boolean = true;
  @Input() shipOrDeliver: any;
  @ViewChild("content") cnt;
  closeResult: string;
  observedProducts:any[] = [];

  listaColCat = ['Title:', 'Desc:', 'Image url:']
  listaColPrd = ['Title:', 'Desc:', 'Images:', 'Price:', 'Quantity:', 'CatId:']
  
  currentDate = ''
  trenutnaRuta: string;
  
  constructor(private modalService:NgbModal, private orderService:OrdersServiceService,private router:Router, private datePipe: DatePipe, private productService: ProductsService, private categoriesService: CategoriesService) { 
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    
  }

  ngOnInit(): void {
    this.trenutnaRuta = this.router.url
  }

  onDelete(row){
    this.deleteEvent.emit(row.id)
  }

  onShipOrder(row){
    for(let i = 0; i<this.rows.length; i++){
      if(this.rows[i].id == row.id){
        if(row.state == 'pending'){
          this.shipEvent.emit(row)
          this.shipOrDeliver[i] = 'deliver'
        }
        else if(row.state == 'shipping...')
          this.deliverEvent.emit(row)
      }
    }
  }

  onCancelOrder(row){
    for(let i = 0; i<this.rows.length; i++){
      if(this.rows[i].id == row.id){
        if(row.state == 'pending'){
          this.cancelEvent.emit(row)
        }
      }
    }
  }

  UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status==200;
  }

  handleAdd(event){

    if(this.trenutnaRuta == '/admin/categories'){
      this.rows.push({'id':this.rows.length+1,'title':event.title,'desc':event.desc,'image':event.image})
      this.categoriesService.addCategory(event).subscribe(resp =>{ 
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.trenutnaRuta]);
      })
    }
    else{
      this.rows.push({'Title':event.title,'Desc':event.desc,'Images':event.images,'Price':event.price,'Quantity':event.quantity,'CatId':event.catId,'updateddate':'//','createddate':this.currentDate})    
      this.productService.addProduct(event).subscribe( resp => {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.trenutnaRuta]);
      })
    }
    

  }

  handleEdit(event){

    if(this.trenutnaRuta == '/admin/categories'){
      // this.rows.push({'id':this.rows.length+1,'title':event.title,'desc':event.desc,'image':event.image})
      this.categoriesService.changeCategory(event).subscribe(resp =>{ 
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.trenutnaRuta]);
      })
    }
    else{
      this.productService.changeProduct(event).subscribe(resp =>{
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
        this.router.onSameUrlNavigation = 'reload'
        this.router.navigate([this.trenutnaRuta])
      })
    }
  }

  showOrder(row) {
  }

  
  open(order) {
    this.orderService.getProductOrders(order.id).subscribe( res=>{
      let prodIds = res.map(productorder=>productorder.productId)
      this.observedProducts = []
      let i =0;
      for(let product of prodIds){
        let x = i;
        this.productService.getProductByID(product).subscribe(prd=>{
          this.observedProducts.push({orderedQuantity:order.quantities[x],...prd}) 
        },
        err => {
          if(err.status == 404){
            if(this.observedProducts==undefined || this.observedProducts==null) {
              this.observedProducts = [{title:'This product was deleted.',price:'',quantity:''}]
            }else{
              this.observedProducts.push({title:'This product was deleted.', price:'',quantity:''})
            }
          }
        }
        )
        i++;
      }
    })
    this.modalService.open(this.cnt, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.observedProducts = []
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.observedProducts = []
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
