import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../config';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get<Category[]>(`${config.url}/Categories`)
  }
}
