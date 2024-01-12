import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-bar',
  standalone: true,
  imports: [ToolbarModule, CommonModule],
  templateUrl: './footer-bar.component.html',
  styleUrl: './footer-bar.component.css'
})
export class FooterBarComponent {

  constructor(private router : Router){

  }

  onClickAboutUs(){
    console.log("AboutUs clicked");
    this.router.navigate(['/about-us'])
  }
  onClickCareers(){
    console.log("Careers clicked");
  }
}
