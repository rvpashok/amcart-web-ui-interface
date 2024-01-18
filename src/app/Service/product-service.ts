import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategorySearchResponse, ProductDetailResponse } from '../model/common-models';
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
    fetchProductDetails(productId : string){
        return this.http.get<ProductDetailResponse>("http://localhost:9010/orchestrationservices/api/products/" + productId,{"responseType":"json"})
        .pipe(
            map(res => {
                console.log('Pipe reponse' + res);
                return res;
            })
        );
    }

}