import { CommonModule } from '@angular/common';
import { CartService } from './cart-service';
import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartService: CartService = inject(CartService);
  open = signal(false);
  items: any[] = []; 

  @Output() onCartItemCount: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router) {
    this.onCartItemCount.emit(this.items.length);
  }

  clearCart() {
    this.items = [];
  }
  
  onCheckout() {
    this.cartService.checkout();
    this.router.navigate(['checkout']);
  }
}
