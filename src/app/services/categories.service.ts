import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../config';
import { Category } from '../models/Category';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get<Category[]>(`${config.url}/Categories`)
  }

  getCategoryById(id){
    return this.http.get<Category>(`${config.url}/Categories/${id}`)
  }

  getCategoryByIdAndPage(categoryId, brojSkip){
    return this.http.get<Product[]>(`${config.url}/Categories/skip/${categoryId}/${brojSkip}`)
  }

  getProductCountForCategory(categoryId){
    return this.http.get<Number>(`${config.url}/Categories/count/${categoryId}`);
  }

  addCategory(category: Category){
    let tempCategory = {
      title:category.title,
      desc:category.desc,
      image:category.image,
      products: []
    }
   return this.http.post<any>(`${config.url}/Categories`,tempCategory,{headers:{"Content-Type":"application/json"}})
  }

  deleteCategoryById(id){
    return this.http.delete(`${config.url}/Categories/${id}`)
  }

  changeCategory(category){
    return this.http.put<any>(`${config.url}/Categories/${category.id}`,category)
  }
}
