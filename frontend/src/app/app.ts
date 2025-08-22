import { Component, signal, ViewChild, inject, ApplicationConfig, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cart } from './cart/cart';

import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

@Injectable({ providedIn: "root" })
export class App {
  protected readonly title = signal('Amazon 2');
  cartItemCount: number = 0;
  @ViewChild(Cart) cartComponent!: Cart;
  firestore: Firestore = inject(Firestore);

  togleCart() {
    this.cartComponent.open.set(!this.cartComponent.open());
  }
}
