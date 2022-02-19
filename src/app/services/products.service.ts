import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Product } from '../models/Product';
import { config } from '../config';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private count = new BehaviorSubject<number>(0); // SALJE VREDNOST
  counter = this.count.asObservable(); // NA NJEGA SE SUBSCRIBEAS
  constructor(private http:HttpClient) { }

  setCount(count){
    this.count.next(count)
  }

  getProducts():Observable<any[]>{
    return this.http.get<Product[]>(`${config.url}/Products`)
  }

  getProductByID(id){
    return this.http.get<Product>(`${config.url}/Products/${id}`)
  }

  getProductsByCategoryId(id){
    return this.http.get<Product[]>(`${config.url}/Products`)
  }
}
