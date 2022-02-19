import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories:Category[];

  constructor(private categoriesService:CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(categories =>{
      this.categories = this.getAllCategories(categories)
    })
  }

  getAllCategories(categories:Category[]){
    return categories
  }

  handleAcc(broj){
    let x = "flushId";
    for(let i=0;i<=broj;i++){
      x+='a';
    }
    return x
  }

}
