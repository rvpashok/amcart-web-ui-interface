import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import {ProductsListingComponent} from './products-listing/products-listing.component';

import { DataViewLayoutOptions } from 'primeng/dataview';
import { DataViewModule } from 'primeng/dataview';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderBarComponent, FooterBarComponent,
    ProductsListingComponent, DataViewModule
  ],
  providers:[],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'AmCart.com';
  layoutOptions: DataViewLayoutOptions[] = [
  ];
}
