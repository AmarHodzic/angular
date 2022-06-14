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

  getProductsByPage(brojSkip){
    return this.http.get<Product[]>(`${config.url}/Products/skip/${brojSkip}`)
  }

  getProductCount(){
    return this.http.get<Number>(`${config.url}/Products/count`);
  }
 
  deleteProductById(id){
    return this.http.delete(`${config.url}/Products/${id}`)
  }

  addProduct(product: Product){
    let tempProduct = {
      title:product.title,
      desc:product.desc,
      images:product.images,
      price:product.price,
      quantity:product.quantity,
    }
   return this.http.post<any>(`${config.url}/Products/${product.catId}`,tempProduct,{headers:{"Content-Type":"application/json"}})
  }

  changeProduct(product){
    return this.http.put<any>(`${config.url}/Products/${product.id}`, product)
  }

  reduceQuantity(quantity, product){
    return this.http.put<any>(`${config.url}/Products/${product.id}/${quantity}`, product)
  }
}
