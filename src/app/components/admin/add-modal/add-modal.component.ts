import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
  // models:any[];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    // this.inputField = this.colList
    // this.inputField = this.colList.map((item)=>'')
    this.inputField = {};
    for(let item of this.atr){
      console.log(item)
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
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm){
    // this.inputField = this.colList
    // console.log(this.inputField);
    this.saveEvent.emit(this.inputField)
    // this.modal.close('Save click')
  }
}
