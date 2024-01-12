import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategorySearchResponse, ProductSearchResponse } from '../model/search-results';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class ProductService{

    constructor(private http: HttpClient) { }

    fetchSearchCategoryData(){
        return this.http.get<Array<CategorySearchResponse>>("http://localhost:9010/orchestrationservices/api/search/categories",{"responseType":"json"})
        .pipe(
            map(res => {
                console.log('Pipe reponse' + res);
                return res;
            })
        );
        
}
    fetchProductDetails(){
        return this.http.get<Array<ProductSearchResponse>>("http://localhost:9010/orchestrationservices/api/product/156834",{"responseType":"json"})
        .pipe(
            map(res => {
                console.log('Pipe reponse' + res);
                return res;
            })
        );
    }

}