import { Component } from '@angular/core';
import { Product } from '../model/product';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from "@angular/material/toolbar";


@Component({
  selector: 'app-products-listing',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatGridListModule, FlexLayoutModule,
    MatToolbarModule],
  templateUrl: './products-listing.component.html',
  styleUrl: './products-listing.component.css'
})
export class ProductsListingComponent {

  public productList : any ;
  public filterCategory : any
  searchKey:string ="";
  constructor() {
    this.productList=[new Product("1","121","Name 1","Short Description 1","Long Description 1", 100),
    new Product("2","122","Name 2","Short Description 2","Long Description 2", 200),
    new Product("3","123","Name 3","Short Description 3","Long Description 3", 10.3),
    new Product("4","124","Name 4","Short Description 4","Long Description 4", 12.35)]
    console.log(this.productList)
   }

  addtocart(){
    console.log("Add To Cart Button clicked");
  }

  filter(filter: string){
    console.log("Filter Button clicked");
  }
}
