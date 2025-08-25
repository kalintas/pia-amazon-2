import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  imports: [],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {

  constructor(private router: Router) {}

  backToHomePage() {
    this.router.navigate([''])
  }

  logout() {
    this.router.navigate(['home'])
  }

  goToEdit() {
    this.router.navigate(['profile', 'edit']);
  }
}
