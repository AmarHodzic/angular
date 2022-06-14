import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { OrdersServiceService } from 'src/app/services/orders-service.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css']
})
export class OrdersAdminComponent implements OnInit {
  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  Headers = ['id','state','adress','price', 'userId']
  Rows = []
  ShipOrDeliver = []

  shipping:boolean = true
  canceled:boolean = false
  constructor(private productService:ProductsService, private ordersService: OrdersServiceService) { }

  ngOnInit(): void {
    this.ordersService.getAllOrders().subscribe( response =>{
      let res = response.map(user=>user.orders.map(order=>{ return {...order,userId:user.id}})).flat()
      for(let i = 0; i < res.length; i++){
        this.Rows.push(res[i])
        if(res[i].state == 'shipping...')
          this.ShipOrDeliver[i] = 'deliver'
        else
          this.ShipOrDeliver[i] = 'ship'
      }
    })
  }

  getProductAndReduceQuantity(toRemove,item) {
    this.productService.getProductByID(item.productId).subscribe(response=>{
      this.productService.reduceQuantity(toRemove,response).subscribe(res=>{
      })
    })
  }

  handleCancelOrder(event){
    this.ordersService.cancelOrderById(event, 0).subscribe( res => {
      this.Rows[event.id-1].state = "canceled"
    })

    this.ordersService.cancelOrderById(event, 0).subscribe( res => {
      this.Rows[event.id-1].state = "canceled"
      this.ordersService.getProductOrders(event.id).subscribe(res=>{
        for(let i =0;i<res.length;i++) {
          let x = -event.quantities[i];
          this.getProductAndReduceQuantity(x,res[i])
        }
      })
    })
  }

  handleShipOrder(event){
    this.ordersService.shipOrderById(event, 1).subscribe( res =>{
      this.Rows[event.id-1].state = "shipping..."
    })
  }

  handleDeliverOrder(event){
    this.ordersService.shipOrderById(event, 2).subscribe( res=>{
      this.Rows[event.id-1].state = "delivered"
    })
  }

}
