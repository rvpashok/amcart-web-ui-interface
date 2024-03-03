import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategorySearchResponse, ProductDetailResponse } from '../model/common-models';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environments';

@Injectable({
    providedIn: 'root'
  })
export class ProductService{

    constructor(private http: HttpClient) { }

    fetchSearchCategoryData(){
       var searchCategoryUrl = environment.baseUrl + "orchestrationservices/api/search/categories";
       return this.http.get<Array<CategorySearchResponse>>(searchCategoryUrl,{"responseType":"json"})
        //return this.http.get<Array<CategorySearchResponse>>("https://ojx3smmf5b.execute-api.ap-south-1.amazonaws.com/orchestrationservices/api/search/categories",{"responseType":"json"})
        .pipe(
            map(res => {
                //console.log('Pipe reponse' + res);
                return res;
            })
        );
        
}
    fetchProductDetails(productId : string){
       var productDataUrl = environment.baseUrl + "orchestrationservices/api/products/" + productId;
       return this.http.get<ProductDetailResponse>(productDataUrl,{"responseType":"json"})
        //return this.http.get<ProductDetailResponse>("https://ojx3smmf5b.execute-api.ap-south-1.amazonaws.com/orchestrationservices/api/products/" + productId,{"responseType":"json"})
        .pipe(
            map(res => {
                //console.log('Pipe reponse' + res);
                return res;
            })
        );
    }

}