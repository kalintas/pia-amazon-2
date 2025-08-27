import { Component, signal, ViewChild, inject, ApplicationConfig, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cart } from './cart/cart';

import { Firestore } from '@angular/fire/firestore';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './services/api-service';
import { Auth } from '@angular/fire/auth';

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
  cookieService = inject(CookieService);
  apiService = inject(ApiService);
  auth = inject(Auth);

  ngOnInit() {
    const sessionCookie = this.cookieService.get("session");
    if (sessionCookie) {
      // Try to log in.
      // With the token cookie.
      this.apiService.signIn().subscribe();
    }
  }

  togleCart() {
    this.cartComponent.open.set(!this.cartComponent.open());
  }
}
