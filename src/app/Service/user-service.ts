import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfileResponse } from '../model/common-models';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class UserService{

    constructor(private http: HttpClient) { }

    fetchProfileDetails(profileId:string, accessToken:string){
            console.log("ProfileId:" + profileId + " :: AccessToken:" + accessToken);
            return this.http.get<UserProfileResponse>("http://localhost:9010/orchestrationservices/api/users/" + profileId + "/profiles",
            //return this.http.get<UserProfileResponse>("https://ojx3smmf5b.execute-api.ap-south-1.amazonaws.com/orchestrationservices/api/users/" + profileId + "/profiles",
            {headers:{"accessToken":accessToken.trim()},"responseType":"json"})
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

}