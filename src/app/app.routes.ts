import { Routes } from '@angular/router';
import { ProductsListingComponent } from './products-listing/products-listing.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutusComponent } from './footer-bar/aboutus/aboutus.component';
import { ContactUsComponent } from './footer-bar/contact-us/contact-us.component';
import { CareersComponent } from './footer-bar/careers/careers.component';
import { PressReleaseComponent } from './footer-bar/press-release/press-release.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
    {path:'product',component:ProductsListingComponent},
    {path:'orders',component:OrderHistoryComponent, canActivate: [AuthGuard]},
    {path:'profile',component:ProfileComponent, canActivate: [AuthGuard]},
    {path:'about-us',component:AboutusComponent},
    {path:'contact-us',component:ContactUsComponent},
    {path:'careers',component:CareersComponent},
    {path:'press-release',component:PressReleaseComponent},
    {path:'notifications',component:NotificationComponent, canActivate: [AuthGuard]},
    {path:'product-detail',component:ProductDetailsComponent},
    {path:'',component:HomePageComponent},
];
