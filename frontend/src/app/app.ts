import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cart } from './cart/cart';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Cart],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Amazon 2');
  cartItemCount: number = 0;
  @ViewChild(Cart) cartComponent!: Cart;

  togleCart() {
    this.cartComponent.open.set(!this.cartComponent.open());
  }
}
