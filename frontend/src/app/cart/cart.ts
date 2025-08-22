import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  
  open = signal(false);
  items: any[] = []; 

  @Output() onCartItemCount: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    this.onCartItemCount.emit(this.items.length);
  }

  clearCart() {
    this.items = [];
  }
  checkout() {
    
  }
}
