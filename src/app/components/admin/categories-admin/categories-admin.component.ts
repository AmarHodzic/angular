import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories-admin.component.html',
  styleUrls: ['./categories-admin.component.css']
})
export class CategoriesAdminComponent implements OnInit {

  Headers = ['title','desc','image']
  Rows = []
  x: boolean;
  
  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe( res => {
      for(let i = 0; i < res.length; i++){
        this.Rows.push(res[i])
      }
    })
  }

  handleDeleteOfRow(event){
    // this.x = true;
    this.categoriesService.deleteCategoryById(event).subscribe( res => {
      this.Rows = this.Rows.filter(ourRow=>ourRow.id!=event)  
    },
    err => {
      if(err.status == 500){
        this.x = true
        setTimeout(()=>{
          this.x = false
        }, 4000)
      }
    })
    
  }
  
}
