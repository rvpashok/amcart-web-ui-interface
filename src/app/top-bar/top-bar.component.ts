import { Component, OnInit } from '@angular/core';
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
    SplitButtonModule, ButtonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  values = '';
  constructor(private searchService: SearchService, 
    private productService: ProductService,
    private router : Router){


  }
  selectedItem: any;
  suggestions = new Array<string>();
  categories = new Array<Category>();
  selectedCategory: Category | undefined;
  items = new Array<MenuItem>();

    ngOnInit() {
        this.productService.fetchSearchCategoryData().subscribe((reponse)=>{
          console.log("Category API Response:" + reponse);
          this.categories = reponse;
          this.selectedCategory = this.categories[0];
        })
        
        this.items = [
          {
              label: 'Login',
              icon: 'pi pi-refresh',
              command: () => {
                  this.login();
              }
          },{ separator: true },
          {
              label: 'Register',
              icon: 'pi pi-times',
              command: () => {
                  this.register();
              }
          },{ separator: true },
          {
            label: 'Notifications',
            icon: 'pi pi-times'
        },{ separator: true }
      ];
    }

  save(severity: string) {
      console.log("Login button Save" + { severity: severity, summary: 'Success', detail: 'Data Saved' });
  } 
  login(){
    console.log("Login button Clicker");
  }
  
  register(){
    console.log("Register button Clicker")
  }

  search(event: AutoCompleteCompleteEvent) {
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
   this.router.navigate(['/product', { 'selectedSearchTerm': event.value }])
  }

}
