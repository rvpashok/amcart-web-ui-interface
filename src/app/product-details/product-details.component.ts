import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSearchResponse } from '../model/common-models';
import { ProductService } from '../Service/product-service';
import { Product, ProductDetailResponse } from '../model/common-models';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule,
    MatToolbarModule, DataViewModule, TagModule, RatingModule, DividerModule, CardModule, ButtonModule,
    CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  public productDetails : ProductDetailResponse | any;

  constructor(private productService: ProductService, private router : Router,
    private activatedRoute: ActivatedRoute) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
    }; 
   // this.router.onSameUrlNavigation = 'reload';
    const navigation = this.router.getCurrentNavigation();  
    var productId = navigation?.extras.queryParams?.["productId"];
    if(productId == undefined){
      var navigationExtras = {
        queryParams: { 'productId': '156835'
                    }
      };
      this.router.navigate(['/product-detail'], navigationExtras);
    }
    var skuId = navigation?.extras.queryParams?.["skuId"];
    if(productId){
      this.productService.fetchProductDetails(productId).subscribe( (response)=>{
      console.log("API Response: " + response);
      this.productDetails = response;
      var skus = response.skus;
      var priceDetails = skus[0].priceDetail;
      this.productDetails['id'] = response.productId;
      for(var idx=0; idx<skus.length; idx++){
        if(skuId == skus[idx].name){
          priceDetails = skus[idx].priceDetail;
          break;
        }
      }
      for(var priceIdx=0; priceIdx<priceDetails.length; priceIdx++){
        if(priceDetails[priceIdx].priceType == 'SALE'){
          this.productDetails["salePrice"] = priceDetails[priceIdx].price;
        }
        if(priceDetails[priceIdx].priceType == 'ORIGINAL'){
          this.productDetails["originalPrice"] = priceDetails[priceIdx].price;
        }
      }
      this.productDetails["discountPercentage"] = Math.ceil(((this.productDetails["originalPrice"] 
      - this.productDetails["salePrice"]) * 100)/this.productDetails["originalPrice"]);

      console.log(this.productDetails)
   });
  
  }}

  selectSkuEvent(event: Event){
    console.log("Sku Select Event Triggered" + event);
    const el = event.currentTarget as HTMLInputElement;
    const selectedProductId = el.parentElement?.getAttribute('data-id');
    const selectedSkuId = el.parentElement?.getAttribute('data-skuId');
    
    console.log("Product Cicked from listing for ProductId:" + selectedProductId + " skuId:" + selectedSkuId);

    var navigationExtras = {
      queryParams: { 'productId': selectedProductId,
                     'skuId': selectedSkuId
                    }
    };
    
    this.router.navigate(['/product-detail'], navigationExtras);
  }

};
