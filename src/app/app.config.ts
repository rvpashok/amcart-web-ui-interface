import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AuthModule } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(),importProvidersFrom(HttpClientModule,  AuthModule.forRoot({
    domain: 'dev-8vycaujdypum3hac.us.auth0.com',
    clientId: 'mjPJo53yJJEsti1WuTg32WLmyi2CKT6M',
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  }))]
};
