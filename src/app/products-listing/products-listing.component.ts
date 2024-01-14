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
    const el = event.currentTarget as HTMLInputElement;
    const selectedProduct = el.getAttribute('data-id');
    console.log("Product Cicked from listing for ProductId:" + selectedProduct);
    this.router.navigate(['/product-detail', { 'productId': selectedProduct}])
  }
}
