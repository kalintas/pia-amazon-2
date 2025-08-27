import { NgStyle } from '@angular/common';
import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-service';
import { User } from '../interfaces/user';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  imports: [NgStyle, ReactiveFormsModule],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit {

  apiService: ApiService = inject(ApiService);
  user!: User;

  userName: FormControl = new FormControl("");
  userSurname: FormControl = new FormControl("");
  userEmail: FormControl = new FormControl("");
  userPhoneNumber: FormControl = new FormControl("");

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
    this.userName.setValue(this.user.name);
    this.userSurname.setValue(this.user.surname);
    this.userEmail.setValue(this.user.email);
    this.userPhoneNumber.setValue(this.user.phoneNumber);
  }

  closePopUp() {
    this.displayPopUp = "none";
  }

  backToHomePage() {
    this.router.navigate(['/'])
  }

  signOut() {
    this.apiService.signOut();
    this.router.navigate(['/'])
  }

  goToEdit() {
    this.router.navigate(['profile', 'edit']);
  }

  submitChanges(event: SubmitEvent) {

    this.apiService.updateUser({
      "name": this.userName.value,
      "surname": this.userSurname.value,
      "phoneNumber": this.userPhoneNumber.value,
    });

    event.preventDefault();
  }
}
