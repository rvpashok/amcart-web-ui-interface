import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSearchResponse, Sku } from '../model/common-models';
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
import { CommonService } from '../Service/common.service';

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
  public productImageDetails : ProductDetailResponse | any;

  constructor(private productService: ProductService, private router : Router,
    private activatedRoute: ActivatedRoute,public commonService:CommonService) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
    }; 
   // this.router.onSameUrlNavigation = 'reload';
    const navigation = this.router.getCurrentNavigation();  
    var productId = navigation?.extras.queryParams?.["productId"];
    if(productId == undefined && navigation){
      productId = navigation.extractedUrl.queryParams["productId"];
      var skuId = navigation?.extractedUrl.queryParams?.["skuId"];
      var navigationExtras = {
        queryParams: { 'productId': productId,
                       'skuId': skuId
                    }
      };
      this.router.navigate(['/product-detail'], navigationExtras);
    }
    var skuId = navigation?.extras.queryParams?.["skuId"];
    if(productId){
      this.productService.fetchProductDetails(productId).subscribe( (response)=>{
      console.log("API Response: " + response);
      this.productDetails = response;
      this.productImageDetails = Object.create(response);
      var skus = response.skus;
      var priceDetails = skus[0].priceDetail;
      this.productDetails["inventoryStatus"] = skus[0].inventoryStatus;
      this.productDetails['id'] = response.productId;
      this.productImageDetails.skus = new Array<Sku>;
      this.productImageDetails.skus[0] = skus[0];
      for(var idx=0; idx<skus.length; idx++){
        if(skuId == skus[idx].name){
          priceDetails = skus[idx].priceDetail;
          this.productDetails["inventoryStatus"] = skus[idx].inventoryStatus;
          this.productImageDetails.skus[0] = skus[idx];
          //break;
        }
        else{
          this.productImageDetails.skus.push(skus[idx]);
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
