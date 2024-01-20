import { Injectable } from '@angular/core';

import { ProductSearchResponse } from '../model/common-models';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  accessToken : string = "";
  totalCartItemCount : number = 0;
  cartItemDetails = new Array<number>();
  constructor() { 
    //this.accessToken = "";
    console.log("Common Service Constructor called");
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  addToCart(event:Event){
    console.log("AddToCart button Clicked");
    this.totalCartItemCount = this.totalCartItemCount + 1;
    this.cartItemDetails = [1,2,3]
  }

  emptyCart(event:Event){
    console.log("EmptyCart button Clicked");
    this.totalCartItemCount = this.totalCartItemCount - 1;
    if(this.totalCartItemCount < 0){
      this.totalCartItemCount = 0;
    }
    this.cartItemDetails = [1,2,3]
  }
  
}
