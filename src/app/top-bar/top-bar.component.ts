import { Component, Inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../Service/search-service';
import {ProductService} from '../Service/product-service'
import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { ProductSearchResponse, SuggestionResponse } from '../model/search-results';
import { ProductsListingComponent } from '../products-listing/products-listing.component';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { CommonService } from '../Service/common.service';
import { PrimeIcons } from 'primeng/api';




interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

interface Category {
  displayName: string;
  categoryId: string;
}

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule,
    MatSelectModule,MatGridListModule, MatMenuModule, MatButtonModule,
    AutoCompleteModule, ToolbarModule, CommonModule, DropdownModule,
    SplitButtonModule, ButtonModule, AuthModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  values = '';
  //public auth: AuthService
  constructor(private searchService: SearchService, 
    private productService: ProductService,
    private router : Router,
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    private commonService:CommonService){
      console.log("AuthModule configggggggggggggg Clicker");
  }
  selectedItem: any;
  suggestions = new Array<string>();
  categories = new Array<Category>();
  selectedCategory: Category | undefined;
  items = new Array<MenuItem>();

  async ngOnInit() {
        this.productService.fetchSearchCategoryData().subscribe((reponse)=>{
          console.log("Category API Response:" + reponse);
          this.categories = reponse;
          this.selectedCategory = this.categories[0];
        })
        
        this.items = [
          {
              label: 'Manage Profile',
              icon: 'pi pi-refresh',
              command: () => {
                  this.profile();
              }
          },
          {
              label: 'Orders',
              icon: 'pi pi-times',
              command: () => {
                  this.orders();
              }
          },
          {
            label: 'Notifications',
            icon: 'pi pi-times',
            command: () => {
              this.notifications();
          }
        },{ separator: true }
      ];
      this.auth.getAccessTokenSilently().subscribe((accessToken)=>{
        const accessTokenTemp = accessToken;
        console.log("ACCCESSTOKEN::" + accessTokenTemp);
      });
      this.auth.idTokenClaims$.subscribe((idToken) => {
        console.log("Existing acessToken: " + this.commonService.getItem("accessToken"));
       
        var accessToken = idToken?.__raw;
        if(accessToken != null && accessToken != undefined){
          this.commonService.setItem("accessToken",accessToken);
          console.log("Existing acessToken: " + this.commonService.getItem("accessToken"));
        }
        
      });
  
      // this.auth.accessToken$.subscribe((accessToken) => {
      //   console.log('Access Token:', accessToken);
      // });
    }

  save(severity: string) {
      console.log("Login button Save" + { severity: severity, summary: 'Success', detail: 'Data Saved' });
  } 

  profile(){
    console.log("Profile button Clicker" + this.auth.isAuthenticated$);
   // this.auth.loginWithRedirect();
   this.router.navigate(['/profile'])
  }

  login(){
    console.log("Login button Clicker" + this.auth.isAuthenticated$);
    this.auth.loginWithRedirect();
    this.auth.getAccessTokenSilently();
    
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
     this.searchService.fetchSuggestions(event.query).subscribe( (response)=>{
      console.log("API Response: " + response);
      
      response.forEach(function (arrayItem) {
        var x = arrayItem.name;
        console.log(x);
        resultsSuggestions.push(x);
    });
      this.suggestions = this.removeDuplicates(resultsSuggestions);
  });
  }

  onEnter(event: Event){
    console.log("Enter pressed selected: " + this.selectedItem);
    this.router.navigate(['/product', { 'selectedSearchTerm': encodeURIComponent(this.selectedItem) }])

  }

  removeDuplicates(arr: Array<string>) { 
    return arr.filter((item, 
        index) => arr.indexOf(item) === index); 
  }

  suggestionSelected(event : AutoCompleteSelectEvent){
    console.log("Suggestion selected: " + event.value);

    // var searchResults = new Array<ProductSearchResponse>();
    //  this.searchService.fetchSearchData(event.value).subscribe( (response)=>{
    //   console.log("API Response: " + response);
    //   searchResults = response;
    // //   response.forEach(function (arrayItem) {
    // //     var x = arrayItem.name;
    // //     console.log(x);
    // //     searchResults.push(x);
    // // });
    // console.log("First PRoduct:" + searchResults[0].brand);
   // var productComponent = new ProductsListingComponent();
   // productComponent.productList = searchResults;
   // console.log("updatedProductList" + productComponent.productList);
   // window.location.reload();
   
   //this.router.navigateByUrl("/product", {state:{'productListResponse':searchResults}});
   this.router.navigate(['/product', { 'selectedSearchTerm': encodeURIComponent(event.value) }])
  }

}
