import { Component, inject, ViewChild } from '@angular/core';
import { Cart } from '../cart/cart';
import { AuthPage } from '../auth-page/auth-page';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  imports: [Cart,AuthPage],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  auth: Auth = inject(Auth);

  constructor(public router: Router) {}

  @ViewChild(Cart) cartComponent!: Cart;
  @ViewChild(AuthPage) profileComponent!: AuthPage;

  cartItemCount: number = 0;

  togleCart() {
    this.cartComponent.open.set(!this.cartComponent.open());
  }

  toProfilePage() {
    this.router.navigate(['/signin']);
  }
}
