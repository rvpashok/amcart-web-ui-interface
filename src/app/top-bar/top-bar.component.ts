import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../Service/search-service';



@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule,
    MatSelectModule,MatGridListModule, MatMenuModule, MatButtonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  values = '';

  constructor(private searchService: SearchService){

  }

  onKey(event: any) { 
    this.values = event.target.value + ' | ';

    // make http call to backend to get the suggestion data
this.searchService.fetchSuggestions(this.values);
  }
}
