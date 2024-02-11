import { Component, Inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { SearchService } from '../Service/search-service';
import {ProductService} from '../Service/product-service'
import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { CommonService} from '../Service/common.service';
import { PrimeIcons } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import {ProductFilter } from '../model/common-models';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MegaMenuModule } from 'primeng/megamenu';



interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

interface Category {
  displayName: string;
  categoryId: string;
  parentCategoryId: string;
}

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,
    MatSelectModule,MatGridListModule, MatMenuModule, MatButtonModule,
    AutoCompleteModule, ToolbarModule, CommonModule, DropdownModule,
    SplitButtonModule, ButtonModule, AuthModule, MenubarModule, 
    InputGroupModule,InputGroupAddonModule, BadgeModule, OverlayPanelModule,
    MegaMenuModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent /*implements AfterViewInit*/{
  values = '';
  //public auth: AuthService
  constructor(private searchService: SearchService, 
    private productService: ProductService,
    private router : Router,
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    public commonService:CommonService){
      //console.log("AuthModule config Clicked");
  }
  
  selectedItem: any;
  suggestions = new Array<string>();
  categories = new Array<Category>();
  topCategories = new Array<Category>();
  selectedCategory: Category | undefined;
  items = new Array<MenuItem>();
  categoryMenuBarItem = new Array<MegaMenuItem>();

  ngOnInit() {
        this.productService.fetchSearchCategoryData().subscribe((reponse)=>{
          //console.log("Category API Response:" + reponse);
          this.categories = reponse;
          //this.topCategories = this.getTopCategories(this.categories);
          this.selectedCategory = this.categories[0];
          this.categoryMenuBarItem = this.constructDynamicMenuBarItems(this.categories);
        })

        this.items = [
          {
              label: 'Manage Profile',
              icon: 'fa fa-solid fa-user',
              command: () => {
                  this.profile();
              }
          },
          {
              label: 'Orders',
              icon: 'pi pi-history',
              command: () => {
                  this.orders();
              }
          },
          {
            label: 'Notifications',
            icon: 'fa fa-solid fa-bell',
            command: () => {
              this.notifications();
          }
         },
         {
          label: 'Wishlist',
          icon: 'fa fa-light fa-heart',
          command: () => {
              this.wishlist();
          }
        },
        { separator: true }
      ];
      this.auth.getAccessTokenSilently().subscribe((accessToken)=>{
        //console.log("Existing acessToken: " + this.commonService.getItem("accessToken"));
        if(accessToken != null && accessToken != undefined){
          this.commonService.setItem("accessToken",accessToken);
         // console.log("New acessToken: " + this.commonService.getItem("accessToken"));
          this.auth.user$.subscribe(userDetails=>{
            console.log("UserID: " + userDetails?.sub);
            this.commonService.setItem("profileId",userDetails?.sub);
          });
        }
        
      });
    }
  

  constructDynamicMenuBarItems(categoryList : Array<Category>){
  var categoryMenuBarItemTemp = new Array<MegaMenuItem>();
  for(var idx = 0;idx<categoryList.length;idx++) {
      var categoryItem = categoryList[idx];
      if(categoryItem.parentCategoryId == null){
        //console.log(categoryItem);
        var megaMenuItem : MegaMenuItem = {};
        megaMenuItem.label = categoryItem.displayName;
        megaMenuItem.id = categoryItem.categoryId;
        var tempMenuItems = this.processCategoryData(categoryItem.categoryId, categoryList, megaMenuItem);
        //console.log("SubmenuItems: " + tempMenuItems);
        if(categoryItem.displayName=="Kids"){
          megaMenuItem.icon = "fa fa-child";
        }
        else if(categoryItem.displayName=="Men"){
          megaMenuItem.icon = "fa fa-male";
        }
        else if(categoryItem.displayName=="Women"){
          megaMenuItem.icon = "fa fa-female";
        }
        if(categoryItem.displayName !="All"){
          megaMenuItem.items = [tempMenuItems];
        }
        
        //menuItem.styleClass = "amcartMenuItem";
        megaMenuItem.style  = {
           'margin-right': '5px',
           'list-style': 'none'
         };
         megaMenuItem.command = (event)=>{
          this.commonService.productListingFilter = new Array<ProductFilter>();
          var navigationExtras = {
            queryParams: { 'searchTerm': "",
                            'categoryId':event.item?.id
                          }
          };
          this.router.navigate(['/product'], navigationExtras);
        };
        //menuItem.separator = true;
        categoryMenuBarItemTemp.push(megaMenuItem);
      }
      
    }
    return categoryMenuBarItemTemp;
  }

  processCategoryData(parentCategoryId:string, categoryList : Array<Category>, parentMenuItem:MenuItem){
      var toRet = new Array<MenuItem>;
      for(var idx = 0;idx<categoryList.length;idx++) {
          var category : Category = categoryList[idx];
          if(category.parentCategoryId != null && category.parentCategoryId.length > 0 && category.parentCategoryId == parentCategoryId){
            var menuItemTemp : MenuItem  = {};
            menuItemTemp.label = category.displayName;
            menuItemTemp.id = category.categoryId;
            menuItemTemp.command = (event)=>{
              this.commonService.productListingFilter = new Array<ProductFilter>();
              var navigationExtras = {
                queryParams: { 'searchTerm': "",
                                'categoryId':event.item?.id
                              }
              };
              this.router.navigate(['/product'], navigationExtras);
            };
            var parentMenuItemsTemp = parentMenuItem.items;
            if(parentMenuItemsTemp == null || parentMenuItemsTemp.length == 0){
              parentMenuItemsTemp = [];
            }
            parentMenuItemsTemp.push(menuItemTemp);
            parentMenuItem.items = parentMenuItemsTemp;
            var tempItems = this.processCategoryData(category.categoryId, categoryList, menuItemTemp);
            if(tempItems && tempItems.length){
              menuItemTemp.items = tempItems;
            }
            toRet.push(menuItemTemp);
          }
          
      }
      return toRet;
  }

  save(severity: string) {
      console.log("Login button Save" + { severity: severity, summary: 'Success', detail: 'Data Saved' });
  } 

  profile(){
    //console.log("Profile button Clicker" + this.auth.isAuthenticated$);
   this.router.navigate(['/profile'])
  }

  login(event:MouseEvent){
    //console.log("Login button Clicker" + this.auth.isAuthenticated$);
    this.auth.loginWithRedirect();
    this.auth.getAccessTokenSilently();
    
  }

  onClickCart(event:Event){
    console.log("Cart button Clicked");
  }

  logout(event:Event) {  
   // console.log("Logout button Clicker" + this.doc.location.origin);
    this.commonService.setItem("accessToken","");
    this.commonService.setItem("profileId","");
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }
  
  orders(){
    //console.log("Orders button Clicker")
    this.router.navigate(['/orders'])
  }

  wishlist(){
    //console.log("Wishlist button Clicker")
    this.router.navigate(['/wishlist'])
  }

  notifications(){
    //console.log("Notification button Clicker")
    this.router.navigate(['/notifications'])
  }

  search(event: AutoCompleteCompleteEvent) {
    //console.log("AutoCompleteCompleteEvent selected: " + event);
    var resultsSuggestions = new Array<string>();
    let categoryId = this.selectedCategory?JSON.stringify(this.selectedCategory.categoryId):'all';
    categoryId = JSON.parse(categoryId);
    this.searchService.fetchSuggestions(encodeURIComponent(event.query), encodeURIComponent(categoryId)).subscribe( (response)=>{
      //console.log("API Response: " + response);
      if(response != null){
        response.forEach(function (arrayItem) {
          var x = arrayItem.name;
          //console.log(x);
          resultsSuggestions.push(x);
      });
    }
    this.suggestions = this.removeDuplicates(resultsSuggestions);
  });
  }

  onEnter(event: Event){
    //console.log("Enter pressed selected: " + this.selectedItem);
    this.selectedItem = this.selectedItem ? this.selectedItem : "";
    this.commonService.productListingFilter = new Array<ProductFilter>();
    var navigationExtras = {
      queryParams: { 'searchTerm': encodeURIComponent(this.selectedItem),
                      'categoryId':this.selectedCategory?.categoryId
                    }
    };
    
    this.router.navigate(['/product'], navigationExtras);

  }

  onClickHomeIcon(){
    this.router.navigate(['/']);
  }

  removeDuplicates(arr: Array<string>) { 
    return arr.filter((item, 
        index) => arr.indexOf(item) === index); 
  }

  suggestionSelected(event : AutoCompleteSelectEvent){
    //console.log("Suggestion selected: " + event.value + " :: Selected Category: " + this.selectedCategory);
    this.commonService.productListingFilter = new Array<ProductFilter>();
    var navigationExtras = {
      queryParams: { 'searchTerm': encodeURIComponent(event.value),
                      'categoryId':this.selectedCategory?.categoryId
                    }
    };
    
    this.router.navigate(['/product'], navigationExtras);
   //this.router.navigate(['/product', { 'searchTerm': encodeURIComponent(event.value) , 'categoryId': this.selectedCategory}])
  }

}
