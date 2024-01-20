import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { CommonService } from '../Service/common.service';
import { PrimeIcons } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';


@Component({
  selector: 'app-footer-bar',
  standalone: true,
  imports: [ToolbarModule, CommonModule, MenubarModule],
  templateUrl: './footer-bar.component.html',
  styleUrl: './footer-bar.component.css'
})
export class FooterBarComponent {

  constructor(private router : Router){


  }

  
  footerMenuItems = new Array<MenuItem>();

  ngOnInit() {
    this.footerMenuItems = [
      {
          label: 'About Us',
          icon: 'pi pi-user',
          // style: {'margin-left': 'auto',
          //   'margin-right': 'auto',
          //   'display': 'block'},
          command: () => {
              this.onClickAboutUs();
          }
      },
      {
          label: 'Contact Us',
          icon: 'fa fa-regular fa-address-card',
          // style: {'margin-left': 'auto',
          //   'margin-right': 'auto',
          //   'display': 'block'},
          command: () => {
              this.onClickContactUs();
          }
      },
      {
        label: 'Careers',
        icon: 'pi pi-question-circle',
        // style: {'margin-left': 'auto',
        //     'margin-right': 'auto',
        //     'display': 'block'},
        command: () => {
          this.onClickCareers();
      }
      },
      {
        label: 'Press Release',
        icon: 'pi pi-external-link',
        // style: {'margin-left': 'auto',
        //     'margin-right': 'auto',
        //     'display': 'block'},
        command: () => {
          this.onClickPressRelease();
      }
     },
      {
        label: '2023-2024',
        icon: 'fa fa-solid fa-copyright',
        // style: {'margin-left': 'auto',
        //     'margin-right': 'auto',
        //     'display': 'block'},
        command: () => {
          this.onClickPressRelease();
      }
    }
  ];
  }

  onClickAboutUs(){
    this.router.navigate(['/about-us'])
  }
  onClickCareers(){
    this.router.navigate(['/careers'])
  }
  onClickContactUs(){
    this.router.navigate(['/contact-us'])
  }
  onClickPressRelease(){
    this.router.navigate(['/press-release'])
  }
}
