import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // currentList: any[];
  // public cartItems = []
  constructor(private productService: ProductsService) { }

  addToCart(cartItem: any, val: any){
    let cartItems = this.getCartItems();
    let cartItemsStringIfEmpty = ""
  
    if(cartItems!=""){
      let arrOfItems = cartItems.split("&")
      let listOfItems = []
      for(let i=0; i<arrOfItems.length; i++){

        let listItem = {
          id:null,
          quantity:null
        };
        let x = arrOfItems[i].split('#')
        listItem.id = x[0]
        listItem.quantity = x[1]
        listOfItems.push(listItem)      
      }
      let cartItemsString = ""
      let counter = 0;
      let dodat = false;
      for(let i = 0; i<listOfItems.length;i++){
        if(cartItem.id == listOfItems[i].id){
          listOfItems[i].quantity = parseInt(listOfItems[i].quantity) + parseInt(val)
          dodat = true;
          break;
        }
      }
      let count = 0;
      for(let i = 0; i<listOfItems.length;i++){
        if(count>0)
          cartItemsString+="&"
        cartItemsString+=listOfItems[i].id+'#'+listOfItems[i].quantity
        count++;
      }
      if(!dodat)
        cartItemsString+="&"+cartItem.id+"#"+val

      localStorage.setItem('cartItem', cartItemsString)
      console.log(cartItemsString);
    }
    else{
      cartItemsStringIfEmpty+=cartItem.id+"#"+val
      localStorage.setItem('cartItem', cartItemsStringIfEmpty)
    }
  
    console.log(cartItems);
  }

  getCartItems(){
    if (localStorage.getItem("cartItem") === null) {
      return "";
    }
    let cartItems = localStorage.getItem("cartItem")
    return cartItems
  }
 
  getCartItemsAsListOfProducts():any[]{
    let cartItems = this.getCartItems();
    if(cartItems=="")
      return [];
    let arrOfItems = cartItems.split('&')
    let listOfItems = []
    for(let i=0; i<arrOfItems.length;i++){
      
      let listItem = {
        id:null,
        quantity:null,
        title:null,
        max:null,
        basePrice:null,
        price:null,
      };
      let x = arrOfItems[i].split('#')
      listItem.id = x[0]
      listItem.quantity = x[1]
      listOfItems.push(listItem)
    }
    for(let i =0;i<listOfItems.length;i++){
      this.productService.getProductByID(listOfItems[i].id).subscribe(item=>{
        listOfItems[i].title = item.title
        listOfItems[i].max = item.quantity
        listOfItems[i].basePrice = item.price
        listOfItems[i].price = item.price*listOfItems[i].quantity
      })
    }
    return listOfItems;
  }

  editCartItem(id){
    let cartItems = this.getCartItems()
    let arrOfItems = cartItems.split("&")
    let listOfItems = []
    for(let i=0; i<arrOfItems.length; i++){
      let listItem = {
        id:null,
        quantity:null
      };
      let x = arrOfItems[i].split('#')
      listItem.id = x[0]
      listItem.quantity = x[1]
      listOfItems.push(listItem)      
    }
    let cartItemsString = ""
    let counter = 0;
    for(let i = 0; i<listOfItems.length; i++){
      if(listOfItems[i].id == id){
        if(counter>0){
          listOfItems[i].quantity++
          cartItemsString+="&"
        }
        cartItemsString+=listOfItems[i].id+"#"+listOfItems[i].quantity
        counter++
      }
    }
    console.log(listOfItems)
    localStorage.setItem('cartItem', cartItemsString)  
  }

  deleteCartItem(id){
    
    let cartItems = this.getCartItems()
    // if(cartItems != ""){
      let arrOfItems = cartItems.split("&")
      let listOfItems = []
      for(let i=0; i<arrOfItems.length; i++){
  
        let listItem = {
          id:null,
          quantity:null
        };
        let x = arrOfItems[i].split('#')
        listItem.id = x[0]
        listItem.quantity = x[1]
        listOfItems.push(listItem)      
      }
      let cartItemsString = ""
      let counter = 0;
      for(let i = 0; i<listOfItems.length;i++){
        if(listOfItems[i].id != id){
          if(counter>0)
            cartItemsString+="&"
          cartItemsString+=listOfItems[i].id+"#"+listOfItems[i].quantity
          counter++
        }
      }
      localStorage.setItem('cartItem', cartItemsString)
    // }  
  }
}
