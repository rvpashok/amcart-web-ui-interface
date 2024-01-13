import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSearchResponse } from '../model/search-results';
import { ProductService } from '../Service/product-service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
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
