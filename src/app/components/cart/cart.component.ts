import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  activatedIndex:number;
  addressInput:string;

  // listaProizvoda = [
  //   { title:'Prvi',img:'', quantity: 1,max:10, price: 30, basePrice:30 },
  //   { title:'Drugi', quantity: 4,max:10, price: 120,basePrice:30 },
  //   { title:'Treci', quantity: 1,max:10, price: 40,basePrice:40 },
  //   { title:'Cetvrti', quantity: 5,max:5, price: 100, basePrice:20 }
  // ]
  listaProizvoda:any[];
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listaProizvoda = this.cartService.getCartItemsAsListOfProducts()
  }

  onChange(evt,proizvod){
    proizvod.quantity = evt.target.value
    this.cartService.editCartItem(proizvod.id)
    proizvod.price = proizvod.basePrice*proizvod.quantity
  }


  deleteProduct(proizvod){
    this.cartService.deleteCartItem(proizvod.id)
    this.listaProizvoda.splice(this.listaProizvoda.indexOf(proizvod), 1);
  }

  printProducts(){
    console.log(this.listaProizvoda.map(product => product.price).reduce((a, b) => a + b, 0));
    console.log(this.listaProizvoda);
    console.log(this.addressInput);
    console.log(this.cartService.getCartItems());
  }

  countSum(){
    return this.listaProizvoda.map(product => product.price).reduce((a, b) => a + b, 0)
  }

}
