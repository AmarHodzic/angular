import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/models/Order';
// import { OrderProduct } from 'src/app/models/OrderProduct';
import { OrdersServiceService } from 'src/app/services/orders-service.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @ViewChild("content") cnt;
  observedProducts:any[] = [];
  // listaOrders = [
  //   {title:'PRVA PORUDZBINA', date:'22.11.2021.', status:'canceled', address:'Neka adresa', price:2000},
  //   {title:'DRUGA PORUDZBINA', date:'22.11.2021.', status:'panding', address:'Neka adresa', price:1000},
  //   {title:'TRECA PORUDZBINA', date:'22.11.2021.', status:'shipping', address:'Neka adresa', price:700},
  //   {title:'CETVRTA PORUDZBINA', date:'22.11.2021.', status:'delivered', address:'Neka adresa', price:200}
  // ]
  listaOrders:Order[];
  closeResult: string;

  constructor(private ordersService:OrdersServiceService, private modalService:NgbModal, private productService:ProductsService) { }

  ngOnInit(): void {
    this.ordersService.getOrdersByUserID(null).subscribe(orders=>{
      this.listaOrders= orders;
    })
  }

  cancelOrder(order){
    if(order.state == 'pending')
      order.state = 'canceled'
      
    // api zahtev this.ordersService.updateOrder(order)
  }

  open(order) {
    console.log(order.products)
    let products = [];
    let x = 0;
  
    for(let product of order.products){
      this.productService.getProductByID(product.id).subscribe(prd=>{
        products.push({orderedQuantity:product.quantity,...prd})
        x++;
        if(x>=order.products.length){
          console.log(products)
          this.observedProducts = products
          console.log(this.observedProducts)
          this.modalService.open(this.cnt, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
        }
      })
    }
    // [
    // {quantity:2, id:1,name:plbabal,cena:enes,...}
    // ]
    // console.log(this.listaOrders)
    
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
