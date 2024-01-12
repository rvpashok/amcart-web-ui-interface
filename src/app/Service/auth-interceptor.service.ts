import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the authorization token from your authentication service or wherever it is stored
    const authToken = localStorage.getItem("accessToken");

    // Clone the request and set the Authorization header
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Pass the cloned request to the next handler
    return next.handle(authRequest);
  }
}