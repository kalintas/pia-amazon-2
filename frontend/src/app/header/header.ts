import { Component, ViewChild } from '@angular/core';
import { Cart } from '../cart/cart';
import { ProfilePage } from '../profile-page/profile-page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [Cart,ProfilePage],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  constructor(private router: Router) {}

  @ViewChild(Cart) cartComponent!: Cart;
  @ViewChild(ProfilePage) profileComponent!: ProfilePage;

  cartItemCount: number = 0;

  togleCart() {
    this.cartComponent.open.set(!this.cartComponent.open());
  }

  toProfilePage() {
    this.router.navigate(['/signin']);
  }
}
