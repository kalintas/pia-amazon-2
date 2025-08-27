import { Component, inject, ViewChild } from '@angular/core';
import { Cart } from '../cart/cart';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-service';
import { CartService } from '../cart/cart-service';

@Component({
  selector: 'app-header',
  imports: [Cart],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  apiService: ApiService = inject(ApiService);
  cartService: CartService = inject(CartService);
  
  constructor(public router: Router) {}

  @ViewChild(Cart) cartComponent!: Cart;

  togleCart() {
    this.cartComponent.open.set(!this.cartComponent.open());
  }

  goToReelsPage() {
    this.router.navigate(['/reels']);
  }

  reloadPage () {
    this.router.navigate(['home']);
  }
}
