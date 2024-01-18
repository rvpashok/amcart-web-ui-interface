import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSearchResponse } from '../model/search-results';
import { ProductService } from '../Service/product-service';
import { Product } from '../model/product';
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

  public productDetails: any;

  constructor(private productService: ProductService, private router : Router,
    private activatedRoute: ActivatedRoute) {
    var productId = this.activatedRoute.snapshot.paramMap.get("productId")!= null ? this.activatedRoute.snapshot.paramMap.get("productId") : "";

    if(productId){

    this.productService.fetchProductDetails(productId).subscribe( (response)=>{
     console.log("API Response: " + response);
     this.productDetails = response;
      

    console.log(this.productDetails)
   });
  
  }}

};
