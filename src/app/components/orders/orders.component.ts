import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/models/Order';
import { AuthService } from 'src/app/services/auth.service';
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
  listaOrders:Order[];
  closeResult: string;

  constructor(private ordersService:OrdersServiceService, private modalService:NgbModal, private productService:ProductsService, private authS:AuthService) { }

  ngOnInit(): void {
    this.ordersService.getOrdersByUserID(this.authS.getUserId()).subscribe(user=>{
      this.listaOrders= user.orders;
    })
  }

  getProductAndReduceQuantity(toRemove,item) {
    this.productService.getProductByID(item.productId).subscribe(response=>{
      this.productService.reduceQuantity(toRemove,response).subscribe(res=>{
      })
    })
  }

  cancelOrder(order){
    if(order.state == 'pending'){
      this.ordersService.cancelOrderById(order, 0).subscribe( res => {
        order.state = "canceled"
        this.ordersService.getProductOrders(order.id).subscribe(res=>{
          for(let i =0;i<res.length;i++) {
            let x = -order.quantities[i];
            this.getProductAndReduceQuantity(x,res[i])
          }
        })
      })
    }
  }

  open(order) {
    this.ordersService.getProductOrders(order.id).subscribe( res=>{
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
        })
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
