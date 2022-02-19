import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Order } from '../models/Order';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {

  constructor(private http:HttpClient) { }

  getOrdersByUserID(id){
    return this.http.get<Order[]>(`${config.url}/Orders`)                  
  }
}
