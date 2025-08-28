import { Component, inject, Input, input, signal, WritableSignal } from '@angular/core';
import { Product } from '../interfaces/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestions } from "./suggestions/suggestions";
import { ApiService } from '../services/api-service';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { CartService } from '../cart/cart-service';
import { Footer } from '../footer/footer';

@Component({
    selector: 'app-product-page',
    imports: [Suggestions, CommonModule, Header, Footer],
    templateUrl: './product-page.html',
    styleUrl: './product-page.css'
})
export class ProductPage {
    apiService: ApiService = inject(ApiService);
    cartService: CartService = inject(CartService);
    @Input() product: WritableSignal<Product | null> = signal(null);

    constructor(private route: ActivatedRoute, public router: Router) { }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            const productId = params['id'];
            this.apiService.getProduct(productId).pipe(
                catchError(() => {
                    this.router.navigate(['404']);
                    return of();
                })
            ).subscribe((product) => {
                this.product.set(product)
            })
        });
    }

    addToCart() {
        const product = this.product();
        if (product) {
            this.cartService.addToCart(product  );
        }
    }
}
