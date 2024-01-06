import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategorySearchResponse } from '../model/search-results';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class ProductService{

    constructor(private http: HttpClient) { }

    fetchSearchCategoryData(){
        return this.http.get<Array<CategorySearchResponse>>("http://localhost:8081/productservices/categories/search",{"responseType":"json"})
        .pipe(
            map(res => {
                console.log('Pipe reponse' + res);
                return res;
            })
        );
        
}

}