import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../product_database';
@Component({
  selector: 'app-product-box',
  imports: [],
  templateUrl: './product-box.html',
  styleUrl: './product-box.css',
  host: {
    "(click)": "onClick()"
  }
})

export class ProductBox {
  @Input() product!: Product;

  constructor(private router: Router) {}

  onClick() {
    this.router.navigate(['/product', this.product.id]);
  }

  addToCart(event: MouseEvent) {
    event.stopPropagation(); // Prevent the click from navigating to the product page
  }
}
