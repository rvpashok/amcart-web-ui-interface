import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfileResponse } from '../model/common-models';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environments';

@Injectable({
    providedIn: 'root'
  })
export class UserService{

    constructor(private http: HttpClient) { }

    fetchProfileDetails(profileId:string, accessToken:string){
            console.log("ProfileId:" + profileId + " :: AccessToken:" + accessToken);
            var userProfileUrl = environment.baseUrl + "orchestrationservices/api/users/" + profileId + "/profiles";
            return this.http.get<UserProfileResponse>(userProfileUrl,
            {headers:{"accessToken":accessToken.trim()},"responseType":"json"})
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

}