import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductPage } from './product-page/product-page';
import { NotFoundComponent } from './not-found-component/not-found-component';
import { AuthPage } from './auth-page/auth-page';

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
    component: AuthPage,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
  {
    path: 'home',
    component: Home
  }
];
