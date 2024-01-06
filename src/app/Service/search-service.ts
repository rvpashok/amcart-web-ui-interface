import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchSuggestionsResults, SearchResults } from '../model/search-results';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class SearchService{

    constructor(private http: HttpClient) { }

    fetchSuggestions(searchTerm:string){
            console.log("SearchTerm:" + searchTerm);
            return this.http.get<SearchSuggestionsResults>("http://localhost:9010/orchestrationservices/api/search/products/suggestions",{params:{"searchTerm":searchTerm.trim()},"responseType":"json"})
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

    fetchSearchData(searchTerm:string){
        console.log("SearchTerm:" + searchTerm);
        return this.http.get<SearchResults>("http://localhost:9010/orchestrationservices/api/search/products",{params:{"searchTerm":searchTerm.trim()},"responseType":"json"})
        .pipe(
            map(res => {
                console.log('Pipe reponse' + res);
                return res.content;
            })
        );
        
}

}