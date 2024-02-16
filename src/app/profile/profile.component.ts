import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../Service/common.service';
import { UserService } from '../Service/user-service';
import { DividerModule } from 'primeng/divider';
import { UserProfileResponse } from '../model/common-models';
import { FlexLayoutModule } from "@angular/flex-layout";
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../Service/loading.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';




@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CardModule, DividerModule, FlexLayoutModule, InputTextModule, FormsModule, CommonModule, ProgressSpinnerModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  public userDetails : UserProfileResponse | any;
  isPageLoading = false;

  constructor(private userService: UserService,private router : Router,
    private activatedRoute: ActivatedRoute,public commonService:CommonService, private loadingService: LoadingService) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
    }; 
   // this.router.onSameUrlNavigation = 'reload';
    var profileId = this.commonService.getItem("profileId");
    var accessToken = this.commonService.getItem("accessToken");
    
      if(profileId){
          this.userService.fetchProfileDetails(profileId, accessToken).subscribe( (response)=>{
          //console.log("API Response: " + response);
          this.userDetails = response;
      });
    
    }
  }

  
ngOnInit(): void {
  this.loadingService.isLoading().subscribe(loading => {
    this.isPageLoading = loading;
  });
}

}
