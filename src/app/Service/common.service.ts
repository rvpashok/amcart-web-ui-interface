import { Injectable } from '@angular/core';

import { ProductFilter, ProductSearchResponse, Category } from '../model/common-models';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  accessToken : string = "";
  totalCartItemCount : number = 0;
  cartItemDetails = new Array<number>();
  productListingFilter = new Array<ProductFilter>();
  categoryItems = new Array<Category>();
  
  constructor() { 
    //this.accessToken = "";
    //console.log("Common Service Constructor called");
  }

  getBreadCrumbItems(selectedCategoryId: string){
    var breadCrumbItems: MenuItem[] = [];
    var categories = this.categoryItems;
    var categoryNameArr = this.getCategoryName(selectedCategoryId, categories);
    categoryNameArr = categoryNameArr.reverse();
    if(categoryNameArr.length == 0){
      breadCrumbItems = [{ label: 'All' }];
    }
    for(var idx=0; idx<categoryNameArr.length; idx++){
      var menuItem : MenuItem = {};
      menuItem["label"] = categoryNameArr[idx];
      breadCrumbItems?.push(menuItem);
    }
    return breadCrumbItems;
  }
  
  getCategoryName(selectedCategoryId: string,  categories : Category[]){
    var toRet = new Array<string>;
    for(var idx=0; idx<categories.length; idx++){
      if(categories[idx].categoryId == selectedCategoryId){
        toRet.push(categories[idx].displayName);
        if(categories[idx].parentCategoryId != null){
          toRet.push(...this.getCategoryName(categories[idx].parentCategoryId, categories))
        }
        break;
      }
    }
    return toRet;
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
    //console.log("AddToCart button Clicked");
    this.totalCartItemCount = this.totalCartItemCount + 1;
    this.cartItemDetails = [1,2,3]
  }

  emptyCart(event:Event){
    //onsole.log("EmptyCart button Clicked");
    this.totalCartItemCount = this.totalCartItemCount - 1;
    if(this.totalCartItemCount < 0){
      this.totalCartItemCount = 0;
    }
    this.cartItemDetails = [1,2,3]
  }

  getSeverity(inventoryStatus: String) {
    switch (inventoryStatus) {
        case 'IN_STOCK':
            return 'primary';

        case 'LOW_STOCK':
            return 'warning';

        case 'OUT_OF_STOCK':
            return 'secondary';

        default:
            return '';
    }
};

isDisabled(inventoryStatus: String) {
  switch (inventoryStatus) {
      case 'IN_STOCK':
          return false;

      case 'LOW_STOCK':
          return false;

      case 'OUT_OF_STOCK':
          return true;

      default:
          return false;
  }
};

  
}
