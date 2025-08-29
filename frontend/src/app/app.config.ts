import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "pia--2-49ee5", appId: "1:124715657239:web:dc2cb9705337c9b4e1d452", storageBucket: "pia--2-49ee5.firebasestorage.app", apiKey: environment.API_KEY, authDomain: "pia--2-49ee5.firebaseapp.com", messagingSenderId: "124715657239", measurementId: "G-V0353KYBYP" }))
    , provideFirestore(() => getFirestore())
    , provideAuth(() => getAuth()),
    provideHttpClient(),
    CookieService
  ]
};
