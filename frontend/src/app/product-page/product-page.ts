import { Component, inject, Input, input, signal, WritableSignal } from '@angular/core';
import { Product } from '../interfaces/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestions } from "./suggestions/suggestions";
import { ApiService } from '../services/api-service';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-product-page',
    imports: [Suggestions, CommonModule],
    templateUrl: './product-page.html',
    styleUrl: './product-page.css'
})
export class ProductPage {
    apiService: ApiService = inject(ApiService);
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
}
