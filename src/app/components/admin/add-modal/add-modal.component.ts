import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit {

  @Input() colList: any;
  @Input() atr: any[];
  @Output() saveEvent = new EventEmitter<any>();
  closeResult: string;
  inputField: any;
  extraSlike:any;
  errorMessages:any = {}
  categoriesList: any;
  addButton: boolean = true
  cancelButton: boolean = false

  constructor(private modalService: NgbModal, private categorisService: CategoriesService) { }
  ngOnInit(): void {
    this.categorisService.getCategories().subscribe( resp =>{
      this.categoriesList = resp;
    })
    this.extraSlike = ['', ''];
    this.inputField = {};
    for(let item of this.atr){
      this.inputField[item] = ''
    }
    
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
        if(this.inputField[key].length<1){
          this.errorMessages.image = 'Please enter image';
          isValid = false;
        }else{
          this.errorMessages.image = ''
        }
      }
      else if(key=='image1'){
        if(this.inputField[key].length<1){
          this.errorMessages.image1 = 'Please enter image url';
          isValid = false;
        }else{
          this.errorMessages.image1 = ''
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
        if(this.inputField[key].length<1){
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

  onSubmit(f){
    if(this.isValidForm()){
      let copy = {...this.inputField}
      copy.images = [this.inputField.image1,this.extraSlike[0],this.extraSlike[1]];
      delete copy.image1;
      this.saveEvent.emit(copy) 
    }
  }

  closeModal(modal, cancel){
    
    if(this.isValidForm() && cancel == true){
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
