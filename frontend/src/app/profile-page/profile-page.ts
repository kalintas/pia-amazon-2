import { NgStyle } from '@angular/common';
import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-profile-page',
  imports: [NgStyle],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit {

  apiService: ApiService = inject(ApiService);
  user!: User;

  constructor(private router: Router) {
  }

  ngOnInit() {
    let user = this.apiService.user();
    if (user) {
      this.user = user;
    } else {
      this.backToHomePage();
    }
  }

  displayPopUp = "none";

  openPopUp() {
    this.displayPopUp = "block";
  }

  closePopUp() {
    this.displayPopUp = "none";
  }

  backToHomePage() {
    this.router.navigate(['/'])
  }

  signOut() {
    this.router.navigate(['/'])
  }

  goToEdit() {
    this.router.navigate(['profile', 'edit']);
  }
}
