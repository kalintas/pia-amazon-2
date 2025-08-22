import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductPage } from './product-page/product-page';
import { NotFoundComponent } from './not-found-component/not-found-component';
import { ProfilePage } from './profile-page/profile-page';
import { PrivacyPolicy } from './privacy-policy/privacy-policy';
import { TermsOfService } from './terms-of-service/terms-of-service';
import { ContactUs } from './contact-us/contact-us';

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
    path: 'signin',
    component: ProfilePage,
  },
  {
    path: 'home',
    component: Home
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
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  }
];
