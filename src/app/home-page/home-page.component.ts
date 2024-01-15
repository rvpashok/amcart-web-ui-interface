import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CarouselModule } from 'primeng/carousel';
import { SearchService } from '../Service/search-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSearchResponse } from '../model/search-results';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, DropdownModule, SplitButtonModule, CarouselModule, DividerModule, ToastModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  public productList = new Array<ProductSearchResponse>();
  public filterCategory : any
  searchKey:string ="";
  layout: string = 'list';

  responsiveOptions: any[] | undefined;

  constructor(private searchService: SearchService, private router : Router,
    private activatedRoute: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
    };  
    const navigation = this.router.getCurrentNavigation();  
    var searchTerm = "";
    var categoryId = "all";
    if(searchTerm || categoryId){
      var searchResults = new Array<ProductSearchResponse>();
      this.searchService.fetchSearchData(searchTerm, categoryId).subscribe( (response)=>{
      console.log("API Response: " + response);
      this.productList = response;
      console.log(this.productList)
   });
  }}

  ngOnInit() {
    
    this.responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
  }

  caroselProductClick(event: Event){
    const el = event.currentTarget as HTMLInputElement;
    const selectedProduct = el.getAttribute('data-id');
    console.log("Product Cicked from Carosel for ProductId:" + selectedProduct);
    this.router.navigate(['/product-detail', { 'productId': selectedProduct}])
  }

  addToCart(event:Event){
    console.log("AddToCart button Clicked");
  }

  subscribeEvent(event:Event){
    console.log("Subscribe button Clicked");
  }

}

