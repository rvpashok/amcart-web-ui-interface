import { Routes } from '@angular/router';
import { ProductsListingComponent } from './products-listing/products-listing.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
    {path:'product',component:ProductsListingComponent},
    {path:'orders',component:OrderHistoryComponent, canActivate: [AuthGuard]},
    {path:'profile',component:ProfileComponent},
    {path:'about-us',component:AboutusComponent},
    {path:'notifications',component:NotificationComponent},
    {path:'product-detail',component:ProductDetailsComponent}
];
