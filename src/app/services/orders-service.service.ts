import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Order } from '../models/Order';
import { config } from '../config';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {

  constructor(private http:HttpClient) { }

  getAllOrders(){
    return this.http.get<User[]>(`${config.url}/Users`)
  }

  getOrdersByUserID(id){
    return this.http.get<User>(`${config.url}/Users/${id}`)                  
  }

  getProductOrders(OrderId){
    return this.http.get<any[]>(`${config.url}/Orders/Products/${OrderId}`)
  }

  addOrder(userId, order?: Order){
    let tempOrder = {
      quantities:order.products.map(item=>item.quantity+''),
      state: order.state,
      adress: order.adress,
      price: order.price,
      products:order.products.map(item=>item.id)
    }
   return this.http.post<any>(`${config.url}/Orders/${userId}`,tempOrder,{headers:{"Content-Type":"application/json"}})
  }
  
  cancelOrderById(order, canceled){
    
    return this.http.put<any>(`${config.url}/Orders/${order.id}/${canceled}`, order)
  }

  shipOrderById(order, shipping){
    return this.http.put<any>(`${config.url}/Orders/${order.id}/${shipping}`, order)
  }

  deliverOrderById(order, deliver){
    return this.http.put<any>(`${config.url}/Orders/${order.id}/${deliver}`, order)
  }
}
