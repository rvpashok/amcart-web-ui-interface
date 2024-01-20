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
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { CommonService } from '../Service/common.service';
import { PrimeIcons } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';






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
    InputGroupModule,InputGroupAddonModule, BadgeModule, OverlayPanelModule],
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
      console.log("AuthModule config Clicked");
  }
  
  selectedItem: any;
  suggestions = new Array<string>();
  categories = new Array<Category>();
  selectedCategory: Category | undefined;
  items = new Array<MenuItem>();
  categoryMenuBarItem = new Array<MenuItem>();

  ngOnInit() {
        this.productService.fetchSearchCategoryData().subscribe((reponse)=>{
          console.log("Category API Response:" + reponse);
          this.categories = reponse;
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
        },{ separator: true }
      ];
      this.auth.getAccessTokenSilently().subscribe((accessToken)=>{
        console.log("Existing acessToken: " + this.commonService.getItem("accessToken"));
        if(accessToken != null && accessToken != undefined){
          this.commonService.setItem("accessToken",accessToken);
          console.log("New acessToken: " + this.commonService.getItem("accessToken"));
        }
      });
      // this.auth.idTokenClaims$.subscribe((idToken) => {
      //   console.log("Existing acessToken: " + this.commonService.getItem("accessToken"));
       
      //   var accessToken = idToken?.__raw;
      //   if(accessToken != null && accessToken != undefined){
      //     this.commonService.setItem("accessToken",accessToken);
      //     console.log("Existing acessToken: " + this.commonService.getItem("accessToken"));
      //   }
        
      // });
  
      // this.auth.accessToken$.subscribe((accessToken) => {
      //   console.log('Access Token:', accessToken);
      // });
    }
  
  // ngAfterViewInit() {
  //   @ViewChild('selectCategoryId') selectCategoryId: ElementRef;
  //   console.log("Inner HTML is:" + this.selectCategoryId.nativeElement.innerHTML);
  // }  

  constructDynamicMenuBarItems(categoryList : Array<Category>){
  var categoryMenuBarItemTemp = new Array<MenuItem>();
  for(var idx = 0;idx<categoryList.length;idx++) {
      var categoryItem = categoryList[idx];
      if(categoryItem.parentCategoryId == null){
        console.log(categoryItem);
        var menuItem : MenuItem = {};
        menuItem.label = categoryItem.displayName;
        menuItem.id = categoryItem.categoryId;
        //menuItem.styleClass = "amcartMenuItem";
        menuItem.style  = {
           'margin-right': '5px'
         };
        menuItem.command = (event)=>{
          var navigationExtras = {
            queryParams: { 'searchTerm': "",
                            'categoryId':event.item?.id
                          }
          };
          this.router.navigate(['/product'], navigationExtras);
        };
        //menuItem.separator = true;
        //menuItem.queryParams = {'categoryId': categoryItem.categoryId };
        //menuItem.icon = "pi pi-times";
        categoryMenuBarItemTemp.push(menuItem);
      }
      
    }
    return categoryMenuBarItemTemp;
  }

  save(severity: string) {
      console.log("Login button Save" + { severity: severity, summary: 'Success', detail: 'Data Saved' });
  } 

  profile(){
    console.log("Profile button Clicker" + this.auth.isAuthenticated$);
   this.router.navigate(['/profile'])
  }

  login(event:MouseEvent){
    console.log("Login button Clicker" + this.auth.isAuthenticated$);
    this.auth.loginWithRedirect();
    this.auth.getAccessTokenSilently();
    
  }

  onClickCart(event:Event){
    console.log("AddToCart button Clicked");
  }

  logout(event:Event) {  
    console.log("Logout button Clicker" + this.doc.location.origin);
    this.commonService.setItem("accessToken","");
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }
  
  orders(){
    console.log("Orders button Clicker")
    this.router.navigate(['/orders'])
  }

  notifications(){
    console.log("Notification button Clicker")
    this.router.navigate(['/notifications'])
  }

  search(event: AutoCompleteCompleteEvent) {
    console.log("AutoCompleteCompleteEvent selected: " + event);
    var resultsSuggestions = new Array<string>();
    let categoryId = this.selectedCategory?JSON.stringify(this.selectedCategory):'all';
    categoryId = JSON.parse(categoryId);
    this.searchService.fetchSuggestions(encodeURIComponent(event.query), encodeURIComponent(categoryId)).subscribe( (response)=>{
      console.log("API Response: " + response);
      if(response != null){
        response.forEach(function (arrayItem) {
          var x = arrayItem.name;
          console.log(x);
          resultsSuggestions.push(x);
      });
    }
    this.suggestions = this.removeDuplicates(resultsSuggestions);
  });
  }

  onEnter(event: Event){
    console.log("Enter pressed selected: " + this.selectedItem);
    this.selectedItem = this.selectedItem ? this.selectedItem : "";

    var navigationExtras = {
      queryParams: { 'searchTerm': encodeURIComponent(this.selectedItem),
                      'categoryId':this.selectedCategory
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
    // const selectCategoryId = document.getElementById(
    //   'selectCategoryId',
    // ) as HTMLDivElement | null;
    // console.log("selectCategoryId"+selectCategoryId?.nodeValue);
    console.log("Suggestion selected: " + event.value + " :: Selected Category: " + this.selectedCategory);

    var navigationExtras = {
      queryParams: { 'searchTerm': encodeURIComponent(event.value),
                      'categoryId':this.selectedCategory
                    }
    };
    
    this.router.navigate(['/product'], navigationExtras);
   //this.router.navigate(['/product', { 'searchTerm': encodeURIComponent(event.value) , 'categoryId': this.selectedCategory}])
  }

}
