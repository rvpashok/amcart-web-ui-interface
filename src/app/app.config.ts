import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { importProvidersFrom } from '@angular/core';
import { AuthModule } from '@auth0/auth0-angular';
import { CommonService } from './service/common.service';
import { AuthInterceptor } from './service/auth-interceptor.service';
import { LoadingService } from './service/loading.service';
import { LoadingInterceptor } from './service/loading-interceptor.service';
import { MessageService } from 'primeng/api';




export const appConfig: ApplicationConfig = {
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true,
  },CommonService, MessageService,provideRouter(routes), provideAnimations(),importProvidersFrom( HttpClientModule,  AuthModule.forRoot({
    domain: 'dev-8vycaujdypum3hac.us.auth0.com',
    clientId: 'mjPJo53yJJEsti1WuTg32WLmyi2CKT6M',
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  }))]
};
