import { Component, inject, ViewChild } from '@angular/core';
import { Cart } from '../cart/cart';
import { AuthPage } from '../auth-page/auth-page';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-header',
  imports: [Cart],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  apiService: ApiService = inject(ApiService);

  constructor(public router: Router) {}

  @ViewChild(Cart) cartComponent!: Cart;
  @ViewChild(AuthPage) profileComponent!: AuthPage;

  cartItemCount: number = 0;

  togleCart() {
    this.cartComponent.open.set(!this.cartComponent.open());
  }
}
