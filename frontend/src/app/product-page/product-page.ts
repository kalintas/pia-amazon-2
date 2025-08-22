import { Component, Input, input } from '@angular/core';
import { ProductDatabase, Product } from '../product_database';
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
        fetch('http://localhost:8080/hello').then(response => response.text()).then((text) => console.log(text));
        this.route.params.subscribe((params) => {
            const productId = params['id'];
            var result = ProductDatabase.find(product => product.id === productId);
            if (result) {
                this.product = result;
            } else {
                this.router.navigate(['/404']);
            }
        });
    }
}
