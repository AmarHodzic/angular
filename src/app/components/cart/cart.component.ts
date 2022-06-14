import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrdersServiceService } from 'src/app/services/orders-service.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  activatedIndex:number;
  addressInput:string;
  listaProizvoda:any[];
  validation = ''
  x:boolean;
  
  prodListUse: any[]

  constructor(private auth:AuthService, private orderService:OrdersServiceService,private cartService: CartService, private productService:ProductsService) { }

  ngOnInit(): void {
    this.listaProizvoda = this.cartService.getCartItemsAsListOfProducts()
  }

  onChange(evt,proizvod){
    this.checkMax(evt,proizvod.id)
    proizvod.quantity = evt.target.value
    this.cartService.editCartItem(proizvod.id,proizvod.quantity)
    proizvod.price = proizvod.basePrice*proizvod.quantity
  }

  deleteProduct(proizvod){
    this.cartService.deleteCartItem(proizvod.id)
    this.listaProizvoda.splice(this.listaProizvoda.indexOf(proizvod), 1);
  }

  printProducts(){
    if(this.listaProizvoda?.length > 0 && this.addressInput != undefined){
      let order: Order = {
        adress: this.addressInput,
        price: this.countSum(),
        state: "pending",
        products: this.listaProizvoda 
      };
      this.orderService.addOrder(this.auth.getUserId(), order).subscribe(response=>{
        this.productService.getProducts().subscribe( rp =>{
          for(let i = 0; i<rp.length; i++){
            for(let j = 0;j<this.listaProizvoda.length; j++){
              if(this.listaProizvoda[j].id == rp[i].id && this.listaProizvoda[j].quantity <= rp[i].quantity){
                this.productService.reduceQuantity(this.listaProizvoda[j].quantity,rp[i]).subscribe( respo =>{})
                localStorage.setItem('cartItem','')
                this.listaProizvoda = []
              }
            }
          }
        })
      });
    }
    else if(this.listaProizvoda.length == 0) {
      this.validation = 'Your cart is empty'
      this.x = true
      setTimeout(()=>{
        this.x = false
      }, 4000)
    }
    else{
      this.validation = 'Enter you address'
      this.x = true
      setTimeout(()=>{
        this.x = false
      }, 4000)
    }
  }

  countSum(){
    return this.listaProizvoda.map(product => product.price).reduce((a, b) => a + b, 0)
  }

  checkMax(event,prodId) {
    for(let i = 0; i<this.listaProizvoda.length; i++){

      if(this.listaProizvoda[i].id==prodId){
        if (event.target.value > this.listaProizvoda[i].max && event.keyCode !== 46 && event.keyCode !== 8 ) {
          event.preventDefault(); 
          event.target.value = this.listaProizvoda[i].max
        }
      }
    }
  }
}
