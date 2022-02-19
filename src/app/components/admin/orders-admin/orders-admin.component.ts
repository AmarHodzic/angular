import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css']
})
export class OrdersAdminComponent implements OnInit {
  myDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  Headers = ['Naziv proizvoda','Datum porudzbine','Status','Adresa','Price']
  Rows = [
    {'Naziv proizvoda':'NekiNziv','Datum porudzbine': this.myDate,'Status':'Canceled','Adresa':'nekaAdresa','Price':'$'+250},
    {'Naziv proizvoda':'NekiNziv1','Datum porudzbine': this.myDate,'Status':'Canceled','Adresa':'nekaAdresa','Price':'$'+250},
    {'Naziv proizvoda':'NekiNziv2','Datum porudzbine': this.myDate,'Status':'Canceled','Adresa':'nekaAdresa','Price':'$'+250},
    {'Naziv proizvoda':'NekiNziv3','Datum porudzbine': this.myDate,'Status':'Canceled','Adresa':'nekaAdresa','Price':'$'+250},
    {'Naziv proizvoda':'NekiNziv4','Datum porudzbine': this.myDate,'Status':'Canceled','Adresa':'nekaAdresa','Price':'$'+250},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
