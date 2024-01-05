import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer-bar',
  standalone: true,
  imports: [ToolbarModule, CommonModule],
  templateUrl: './footer-bar.component.html',
  styleUrl: './footer-bar.component.css'
})
export class FooterBarComponent {

  onClick(){
    console.log("Careers clicked");
  }
}
