import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class SearchService{

    constructor(private http: HttpClient) { }

    fetchSuggestions(searchTerm:string){
            console.log("SearchTerm:" + searchTerm);
            var response = this.http.get("http://localhost:8085/searchservices/search/products/suggestions",{params:{"searchTerm":searchTerm.trim()},"responseType":"json"});
            response.subscribe( (res)=>{
                console.log(res);
            })
    }

}