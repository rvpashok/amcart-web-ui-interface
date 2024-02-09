import { Component } from '@angular/core';
import { Product } from '../model/common-models';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { SearchService } from '../Service/search-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSearchResponse } from '../model/common-models';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonService } from '../Service/common.service';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import {ProductSorting, ProductListingPageDetails, ProductFilter, ProductFilterRequest} from '../model/common-models';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-products-listing',
  standalone: true,
  imports: [FormsModule, CommonModule, MatCardModule, MatButtonModule, MatGridListModule, FlexLayoutModule,
    MatToolbarModule, DataViewModule, TagModule, RatingModule, DividerModule, CardModule, ButtonModule,DropdownModule
    ],
  templateUrl: './products-listing.component.html',
  styleUrl: './products-listing.component.css'
})
export class ProductsListingComponent {

  
  public productList = new Array<ProductSearchResponse>();
  public filterCategory : any
  searchKey:string ="";
  layout: string = 'list';
  public productSortingOptions = new Array<ProductSorting>;
  public productFilterByColorOptions = new Array<ProductFilter>;
  public productFilterByBrandOptions = new Array<ProductFilter>;
  public selectedSortByOption: ProductSorting | undefined;
  public selectedFilterByColorOption: ProductFilter | undefined;
  public selectedFilterByBrandOption: ProductFilter | undefined;
  public currentPageDetails: ProductListingPageDetails | undefined;
  public appliedFilter = new Array<ProductFilterRequest>();

  constructor(private searchService: SearchService, public commonService:CommonService, private router : Router,
    private activatedRoute: ActivatedRoute) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
    }; 
    this.productSortingOptions = [
      {displayName: 'Featured', name: 'featured',sortObj:'{"fieldName":"_score","direction":"DESC"}'},
      { displayName: 'Price: Low to High', name: 'price_low_to_high' , sortObj :'{"fieldName":"price","direction":"ASC"}'},
      { displayName: 'Price: High to Low', name: 'price_high_to_low', sortObj:'{"fieldName":"price","direction":"DESC"}'}
      ];

    this.productFilterByColorOptions = [
        {fieldName:'skuColor', displayName: 'Blue', name: 'blue',operator:'IN'},
        {fieldName:'skuColor', displayName: 'Brown', name: 'brown',operator:'IN'},
        {fieldName:'skuColor', displayName: 'Dark Blue', name: 'dark blue',operator:'IN'},
        {fieldName:'skuColor', displayName: 'Light Blue', name: 'light blue',operator:'IN'},
        {fieldName:'skuColor', displayName: 'Light Grey', name: 'light grey',operator:'IN'},
        {fieldName:'skuColor', displayName: 'Green', name: 'green',operator:'IN'},
        {fieldName:'skuColor', displayName: 'Grey', name: 'grey',operator:'IN'},
        {fieldName:'skuColor', displayName: 'Orange', name: 'orange',operator:'IN'},
        {fieldName:'skuColor', displayName: 'Pink', name: 'pink',operator:'IN'},
        {fieldName:'skuColor', displayName: 'Purple', name: 'purple',operator:'IN'},
        {fieldName:'skuColor', displayName: 'Red', name: 'red',operator:'IN'},
        {fieldName:'skuColor', displayName: 'Rose', name: 'rose',operator:'IN'},
        {fieldName:'skuColor', displayName: 'Yellow', name: 'yellow',operator:'IN'},
      ];

      this.productFilterByBrandOptions = [
        {fieldName:'brand', displayName: 'Urbano', name: 'urbano',operator:'IN'},
        {fieldName:'brand', displayName: 'Lenskart', name: 'lenskart',operator:'IN'},
        {fieldName:'brand', displayName: 'Puma', name: 'puma',operator:'IN'},
        {fieldName:'brand', displayName: 'Polo', name: 'polo',operator:'IN'},
        {fieldName:'brand', displayName: 'Bumzee', name: 'bumzee',operator:'IN'}
      ];

    const navigation = this.router.getCurrentNavigation();  
    var stateold = this.router.routerState;
    var searchTerm = navigation?.extras.queryParams?.["searchTerm"];
    var categoryId = navigation?.extras.queryParams?.["categoryId"];
    var sortBy = navigation?.extras.queryParams?.["sortBy"];
    var sortByReq = "";
    this.currentPageDetails = {"categoryId":"all","searchTerm":"",sortObj:""};
    var appliedFilterTemp = this.commonService.productListingFilter;
    if(appliedFilterTemp != null && appliedFilterTemp.length > 0){
      for(var idx=0; idx<appliedFilterTemp.length; idx++){
        var tempFilterReq : ProductFilterRequest;
        tempFilterReq = {"fieldName":"","fieldValue":[],"operator":""};
        tempFilterReq["fieldName"] = appliedFilterTemp[idx].fieldName;
        tempFilterReq["fieldValue"] = new Array<string>();
        tempFilterReq["fieldValue"][0]= appliedFilterTemp[idx].name;
        tempFilterReq["operator"] = appliedFilterTemp[idx].operator;
        this.appliedFilter.push(tempFilterReq);
      }
    }
    if(sortBy == undefined || sortBy == ""){
      sortByReq = this.productSortingOptions[0].sortObj;
      this.selectedSortByOption = this.productSortingOptions[0];
    }
    else{
      for(var idx=0; idx<this.productSortingOptions.length; idx++){
        if(sortBy == this.productSortingOptions[idx].name){
          sortByReq = this.productSortingOptions[idx].sortObj;
          this.selectedSortByOption = this.productSortingOptions[idx];
          break;
        }
      }
    }
    if(searchTerm || categoryId){
      if(this.currentPageDetails){
        this.currentPageDetails.categoryId = categoryId;
        this.currentPageDetails.searchTerm = searchTerm;
        this.currentPageDetails.sortObj = sortByReq;
      }
      this.searchService.fetchSearchData(searchTerm, categoryId, sortByReq, JSON.stringify(this.appliedFilter)).subscribe( (response)=>{
       //console.log("API Response: " + response);
      if(response != null && response.length > 0){
        response.forEach((itemIItr)=>{
          if(itemIItr.shortDescription?.length > 60) {
            itemIItr.shortDescription = itemIItr.shortDescription.substring(0,60) + "...";
          }
          if(itemIItr.name?.length > 30) {
            itemIItr.name = itemIItr.name.substring(0,30) + "...";
          }
          //itemIItr.inventoryStatus = "INSTOCK";
        }) 
      } 
      this.productList = response?response:[];
      //console.log(this.productList)
   });


  }

}

productSortByChange(event:DropdownChangeEvent){
  //console.log("EventChanged");
  this.selectedFilterByBrandOption = this.selectedFilterByBrandOption?this.selectedFilterByBrandOption : undefined;
  this.selectedFilterByColorOption = this.selectedFilterByColorOption?this.selectedFilterByColorOption: undefined;
  this.commonService.productListingFilter = new Array<ProductFilter>();
  if(this.selectedFilterByBrandOption != null){
    this.commonService.productListingFilter.push(this.selectedFilterByBrandOption);
  }
  if(this.selectedFilterByColorOption != null){
    this.commonService.productListingFilter.push(this.selectedFilterByColorOption);
  }
  
  this.selectedSortByOption = this.selectedSortByOption ? this.selectedSortByOption : undefined;

    var navigationExtras = {
      queryParams: { 'searchTerm': this.currentPageDetails?.searchTerm,
                      'categoryId': this.currentPageDetails?.categoryId?this.currentPageDetails.categoryId:"all",
                      'sortBy': this.selectedSortByOption?.name
                    },
      state:{"keyPrev":"SelectedSoryByOptions"}
    };
    
    this.router.navigate(['/product'], navigationExtras);
}


  applyFilter(event:Event){
    this.selectedFilterByBrandOption = this.selectedFilterByBrandOption?this.selectedFilterByBrandOption : undefined;
    this.selectedFilterByColorOption = this.selectedFilterByColorOption?this.selectedFilterByColorOption: undefined;
    this.commonService.productListingFilter = new Array<ProductFilter>();
    if(this.selectedFilterByBrandOption != null){
      this.commonService.productListingFilter.push(this.selectedFilterByBrandOption);
    }
    if(this.selectedFilterByColorOption != null){
      this.commonService.productListingFilter.push(this.selectedFilterByColorOption);
    }
    this.selectedSortByOption = this.selectedSortByOption ? this.selectedSortByOption : undefined;

    var navigationExtras = {
      queryParams: { 'searchTerm': this.currentPageDetails?.searchTerm,
                      'categoryId': this.currentPageDetails?.categoryId?this.currentPageDetails.categoryId:"all",
                      'sortBy': this.selectedSortByOption?.name
                    }
    };
    
    this.router.navigate(['/product'], navigationExtras);  
  }

  resetFilter(event:Event){
    console.log("Reset Filter Button clicked");
  }

  productClick(event: Event){ 
    const el = event.currentTarget as HTMLInputElement;
    const selectedProduct = el.getAttribute('data-id');
    const selectedSku = el.getAttribute('data-sku-id');
    //console.log("Product Cicked from listing for ProductId:" + selectedProduct);

    var navigationExtras = {
      queryParams: { 'productId': selectedProduct,
                      'skuId': selectedSku
                    }
    };
    
    this.router.navigate(['/product-detail'], navigationExtras);
  }
}
