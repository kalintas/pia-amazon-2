import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductPage } from './product-page/product-page';
import { NotFoundComponent } from './not-found-component/not-found-component';
import { AuthPage } from './auth-page/auth-page';
import { PrivacyPolicy } from './privacy-policy/privacy-policy';
import { TermsOfService } from './terms-of-service/terms-of-service';
import { ContactUs } from './contact-us/contact-us';
import { ProfilePage } from './profile-page/profile-page';
import { CanActivateProfile } from './profile-page/can-activate-profile';
import { Checkout } from './checkout/checkout';
import { ReelsPage } from './reels-page/reels-page';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Amazon 2',
  },
  {
    path: 'product/:id',
    component: ProductPage,
  },
  {
    path: 'auth',
    component: AuthPage
  },
  {
    path: 'profile',
    component: ProfilePage,
    canActivate: [CanActivateProfile]
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'reels',
    component: ReelsPage
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicy
  },
  {
    path: 'terms-of-service',
    component: TermsOfService
  },
  {
    path: 'contact-us',
    component: ContactUs
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicy
  },
  {
    path: 'terms-of-service',
    component: TermsOfService
  },
  {
    path: 'checkout',
    component: Checkout

  },
  {
    path: 'contact-us',
    component: ContactUs
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  }
];
