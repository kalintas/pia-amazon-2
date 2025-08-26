import { Component, HostListener, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product';
import { CartService } from '../../cart/cart-service';
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
  cartService: CartService = inject(CartService);

  constructor(private router: Router) {}

  onClick() {
    this.router.navigate(['/product', this.product.id]);
  }

  addToCart(event: MouseEvent) {
    this.cartService.addToCart(this.product);
    event.stopPropagation();
  }
}
