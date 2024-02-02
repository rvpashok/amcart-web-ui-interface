import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchSuggestionsResults, SearchResults } from '../model/common-models';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class SearchService{

    constructor(private http: HttpClient) { }

    fetchSuggestions(searchTerm:string, categoryId:string){
            console.log("SearchTerm:" + searchTerm + " :: CategoryId:" + categoryId);
            //return this.http.get<SearchSuggestionsResults>("http://localhost:9010/orchestrationservices/api/search/products/suggestions",
            return this.http.get<SearchSuggestionsResults>("https://ojx3smmf5b.execute-api.ap-south-1.amazonaws.com/orchestrationservices/api/search/products/suggestions",
            {params:{"searchTerm":searchTerm.trim(), "categoryId": categoryId.trim()},"responseType":"json"})
           /* response.subscribe( (res)=>{
                console.log(res.content);
            })*/
            .pipe(
                map(res => {
                    //console.log('Pipe reponse' + res);
                    return res.content;
                })
            );
            
    }

    fetchSearchData(searchTerm: any, categoryId:any, sortBy:any, filter:any){
        console.log("SearchTerm:" + searchTerm + " :: CategoryId" + categoryId + " ::SortBy:" + sortBy);
        var paramsObj = {};
        if(filter != undefined && filter != ""){
            paramsObj = {"searchTerm":searchTerm.trim(), "categoryId":categoryId.trim(), "amcartSort":sortBy,
        "amcartFilter": filter};
        }
        else{
            paramsObj =  {"searchTerm":searchTerm.trim(), "categoryId":categoryId.trim(), "amcartSort":sortBy};
        }
        
        //return this.http.get<SearchResults>("http://localhost:9010/orchestrationservices/api/search/products",
        return this.http.get<SearchResults>("https://ojx3smmf5b.execute-api.ap-south-1.amazonaws.com/orchestrationservices/api/search/products",
        {params:paramsObj,"responseType":"json"})
        .pipe(
            map(res => {
                console.log('Pipe reponse' + res);
                return res.content;
            })
        );
        
}

}