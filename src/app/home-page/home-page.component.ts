import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CarouselModule } from 'primeng/carousel';
import { SearchService } from '../Service/search-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSearchResponse, ProductFilter } from '../model/common-models';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgZone } from '@angular/core';
import { CommonService } from '../Service/common.service';
import { TagModule } from 'primeng/tag';
import { LoadingService } from '../Service/loading.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, DropdownModule, SplitButtonModule, CarouselModule, DividerModule, ToastModule, TagModule, ProgressSpinnerModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  public productList = new Array<ProductSearchResponse>();
  public topPicksOfTheWeekproductList = new Array<ProductSearchResponse>();
  public filterCategory : any
  searchKey:string ="";
  layout: string = 'list';

  responsiveOptions: any[] | undefined;
  isPageLoading = false;

  constructor(private searchService: SearchService, private router : Router,
    private activatedRoute: ActivatedRoute, public commonService:CommonService,
    private messageService: MessageService,
    private zone: NgZone, private loadingService: LoadingService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
    };  
    const navigation = this.router.getCurrentNavigation();  
    var searchTerm = "";
    var categoryId = "all";
    this.commonService.productListingFilter = new Array<ProductFilter>();
    if(searchTerm || categoryId){
      this.commonService.resetSelectedSearchTermItem();
      this.commonService.setSelectedCategory(categoryId);
      var amcartDealOfTheDayFilter = '[{"fieldName":"tags","fieldValue":["Deal"],"operator":"IN"}]';
      this.searchService.fetchSearchData(searchTerm, categoryId, "",amcartDealOfTheDayFilter).subscribe( (response)=>{
      //console.log("API Response: " + response);
      if(response != null && response.length > 0){
        response.forEach((itemIItr)=>{
          if(itemIItr.shortDescription?.length > 60) {
            itemIItr.shortDescription = itemIItr.shortDescription.substring(0,60) + "...";
          }
          if(itemIItr.name?.length > 30) {
            itemIItr.name = itemIItr.name.substring(0,30) + "...";
          }
        }) 
      } 
      this.productList = response;
      //console.log(this.productList)
   });

   var amcartTopPicksOfTheWeekFilter = '[{"fieldName":"tags","fieldValue":["Top Picks"],"operator":"IN"}]';
      this.searchService.fetchSearchData(searchTerm, categoryId, "",amcartTopPicksOfTheWeekFilter).subscribe( (response)=>{
      //console.log("API Response: " + response);
      if(response != null && response.length > 0){
        response.forEach((itemIItr)=>{
          if(itemIItr.shortDescription?.length > 60) {
            itemIItr.shortDescription = itemIItr.shortDescription.substring(0,60) + "...";
          }
          if(itemIItr.name?.length > 30) {
            itemIItr.name = itemIItr.name.substring(0,30) + "...";
          }
        }) 
      } 
      this.topPicksOfTheWeekproductList = response;
      //console.log(this.topPicksOfTheWeekproductList)
   });

  }}

  ngOnInit() {

    this.loadingService.isLoading().subscribe(loading => {
      this.isPageLoading = loading;
    });
    
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
    const selectedSku = el.getAttribute('data-sku-id');
    //console.log("Product Cicked from listing for ProductId:" + selectedProduct);
    var navigationExtras = {
      queryParams: { 'productId': selectedProduct,
      'skuId': selectedSku}
    };
    
    this.router.navigate(['/product-detail'], navigationExtras);
  }

  subscribeEvent(event:Event){
    //console.log("Subscribe button Clicked");
  }

  showToast1() {

    this.messageService.clear();
    this.messageService.add({ key: 'toast1', severity: 'success', summary: 'Success', detail: 'key: toast1' });
}

showToast2() {
  setTimeout(() => {
    this.messageService.add({
      severity: "success",
      summary: "Success Message",
      detail: "Order submitted"
    });
  }, 3000);
  this.zone.run(() => {
    this.messageService.clear();
    this.messageService.add({ key: 'toast2', severity: 'warn', summary: 'Warning', detail: 'key: toast2' });
  });
   
}

}

