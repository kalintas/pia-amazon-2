import { Component, Input, input } from '@angular/core';
import { Product } from '../interfaces/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestions } from "./suggestions/suggestions";

@Component({
    selector: 'app-product-page',
    imports: [Suggestions],
    templateUrl: './product-page.html',
    styleUrl: './product-page.css'
})
export class ProductPage {
    @Input() product!: Product;

    constructor(private route: ActivatedRoute, public router: Router) { }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            const productId = params['id'];
            /*
            var result = ProductDatabase.find(product => product.id === productId);
            if (result) {
                this.product = result;
            } else {
                this.router.navigate(['/404']);
            }*/
        });
    }
}
