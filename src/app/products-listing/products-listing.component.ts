import { Component } from '@angular/core';
import { Product } from '../model/product';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { SearchService } from '../Service/search-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSearchResponse } from '../model/search-results';
import { DataViewModule } from 'primeng/dataview';



@Component({
  selector: 'app-products-listing',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatGridListModule, FlexLayoutModule,
    MatToolbarModule, DataViewModule],
  templateUrl: './products-listing.component.html',
  styleUrl: './products-listing.component.css'
})
export class ProductsListingComponent {

  public productList = new Array<ProductSearchResponse>();
  public filterCategory : any
  searchKey:string ="";
  layout: string = 'list';
  constructor(private searchService: SearchService, private router : Router,
    private activatedRoute: ActivatedRoute) {
   
    // this.productList=[new Product("1","121","Name 1","Short Description 1","Long Description 1", 100),
    // new Product("2","122","Name 2","Short Description 2","Long Description 2", 200),
    // new Product("3","123","Name 3","Short Description 3","Long Description 3", 10.3),
    // new Product("4","124","Name 4","Short Description 4","Long Description 4", 12.35),
    // new Product("5","121","Name 5","Short Description 1","Long Description 1", 100),
    // new Product("6","122","Name 6","Short Description 2","Long Description 2", 200),
    // new Product("7","123","Name 7","Short Description 3","Long Description 3", 10.3),
    // new Product("8","124","Name 8","Short Description 4","Long Description 4", 12.35)]

    // this.searchService.fetchSearchData("Laptop").subscribe( (response)=>{
    //   console.log("API Response: " + response);
    var searchTerm = this.activatedRoute.snapshot.paramMap.get("selectedSearchTerm")!= null ? this.activatedRoute.snapshot.paramMap.get("selectedSearchTerm") : "";
    
    if(searchTerm){
      var searchResults = new Array<ProductSearchResponse>();
    this.searchService.fetchSearchData(searchTerm).subscribe( (response)=>{
     console.log("API Response: " + response);
     this.productList = response;
      

    console.log(this.productList)
   });
  
  }}

  getSeverity(product: Product) {
    switch (product.name) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
};

  addtocart(){
    console.log("Add To Cart Button clicked");
  }

  filter(filter: string){
    console.log("Filter Button clicked");
  }

  productClick(event: Event){
    var selectedProduct = "156836";
    if(event.currentTarget != null && event.currentTarget instanceof EventTarget){
      //selectedProduct = event.currentTarget.getAttribute("data-id");
    }
    console.log("Product Cicked from listing");
    this.router.navigate(['/product-detail', { 'productId': selectedProduct}])
  }
}
