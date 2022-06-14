import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

  @Output() saveEvent = new EventEmitter<any>();
  @Input() colList: any;
  @Input() atr: any[];
  @Input() rowId: any;
  closeResult: string;
  inputField: any = {};
  extraSlike:any;
  trenutnaRuta: string;
  errorMessages:any = {}
  categoriesList: any;
  addButton: boolean = true
  cancelButton: boolean = false;

  constructor(private router:Router, private modalService: NgbModal, private categoriesService: CategoriesService, private productService: ProductsService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe( resp =>{
      this.categoriesList = resp
    })
    this.extraSlike = ['', '']
    this.trenutnaRuta = this.router.url
    for(let item of this.atr){
      this.inputField[item] = ''
    }
    
  }

  open(content) {
    if(this.trenutnaRuta == '/admin/categories'){
      this.categoriesService.getCategoryById(this.rowId).subscribe( res=>{
        for(let item of this.atr){
            this.inputField[item] = res[item]
          
        }
      })
    }
    else{
      this.productService.getProductByID(this.rowId).subscribe( res=>{
        for(let item of this.atr){
            if(item!='image1')
              this.inputField[item] = res[item]
            else{
              this.inputField[item] = res['images'][0]
              this.extraSlike[0] = res['images'][1] || ''
              this.extraSlike[1] = res['images'][2] || ''
            }
        }
      })
    }
    this.modalService.open(content, {
      // size: 'lg',
      ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.errorMessages.title = ''
      this.errorMessages.desc = ''
      this.errorMessages.image = ''
      this.errorMessages.price = ''
      this.errorMessages.quantity = ''
      this.errorMessages.catId = ''
      this.errorMessages.image1 = ''
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.errorMessages.title = ''
      this.errorMessages.desc = ''
      this.errorMessages.image = ''
      this.errorMessages.price = ''
      this.errorMessages.quantity = ''
      this.errorMessages.catId = ''
      this.errorMessages.image1 = ''
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  isValidForm(){
    let isValid = true;
    
    for(let key in this.inputField) {
      if(key=='title') {
        if(this.inputField[key].length<1){
          this.errorMessages.title = 'Please enter title';
          isValid = false;
        }else {
          this.errorMessages.title = '';
        }
      }
      else if(key=='desc'){
        if(this.inputField[key].length<1){
          this.errorMessages.desc = 'Please enter description';
          isValid = false;
        }else{
          this.errorMessages.desc = ''
        }
      }
      else if(key=='image'){
        if(this.inputField[key]?.length<1){
          this.errorMessages.image = 'Please enter image';
          isValid = false;
        }else{
          this.errorMessages.image = ''
        }
      }
      else if(key=='image1'){
        if(this.inputField[key]?.length<1){
          this.errorMessages.image1 = 'Please enter images';
          isValid = false;
        }else{
          this.errorMessages.image1 = ''
        }
      }
      else if(key=='image2'){
        if(this.extraSlike[0]?.length<1){
          this.errorMessages.image2 = 'Please enter images';
          isValid = false;
        }else{
          this.errorMessages.image2 = ''
        }
      }
      else if(key=='image3'){
        if(this.extraSlike[1].length<1){
          this.errorMessages.image2 = 'Please enter images';
          isValid = false;
        }else{
          this.errorMessages.image2 = ''
        }
      }
      else if(key == 'price'){
        if(this.inputField[key].length<1){
          this.errorMessages.price = 'Please enter price'
          isValid = false
        }
        else if(!this.OnlyNumbersAllowed(this.inputField[key])){
          this.errorMessages.price = 'Only numbers allowed'
          isValid = false;
        }
        else{
          this.errorMessages.price = ''
        }
      }
      else if(key == 'quantity'){
        if(this.inputField[key].length<1){
          this.errorMessages.quantity = 'Please enter quantity'
          isValid = false
        }
        else if(!this.OnlyNumbersAllowed(this.inputField[key])){
          this.errorMessages.quantity = 'Only numbers allowed'
          isValid = false;
        }
        else{
          
          this.errorMessages.quantity = ''
        }
      }
      else if(key == 'catId'){
        if(this.inputField[key]==undefined){
          
          this.errorMessages.catId = 'Please enter category id'
          isValid = false
        }
        else{
          this.errorMessages.catId = ''
        }
      }
    }

    return isValid;
  }

  OnlyNumbersAllowed(event){
    let regex = /^[0-9]*$/;

    return regex.test(event)
  }

  onSubmit(f: NgForm){
    // let cat = {...this.inputField, id:this.rowId, products:[]}
    if(this.isValidForm()){
      let copy = {...this.inputField, id:this.rowId, products:[]}
      copy.images = [this.inputField.image1,this.extraSlike[0],this.extraSlike[1]]
      delete copy.image1;
      this.saveEvent.emit(copy)
    }
  }

  closeModal(modal, cancel:boolean){
    if(this.isValidForm() && cancel==true){
      modal.close('Save click')
    }
    else if(cancel == false){
      modal.close('Save click')
      this.errorMessages.title = ''
      this.errorMessages.desc = ''
      this.errorMessages.image = ''
      this.errorMessages.price = ''
      this.errorMessages.quantity = ''
      this.errorMessages.catId = ''
      this.errorMessages.image1 = ''
    }
  }
}
