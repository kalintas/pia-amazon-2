import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductPage } from './product-page/product-page';
import { NotFoundComponent } from './not-found-component/not-found-component';

export const routes: Routes = [
    {
        path: '', 
        component: Home,
        title: 'Amazon 2'
    },
    {
        path: 'product/:id',
        component: ProductPage
    },
    {
        path: '404',
        component: NotFoundComponent 
    },
    {
        path: '**',
        redirectTo: '404'
    }
];
