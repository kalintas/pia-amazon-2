import { NgStyle } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-service';
import { User } from '../interfaces/user';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-profile-page',
  imports: [NgStyle, ReactiveFormsModule, Header, Footer],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit {

  apiService: ApiService = inject(ApiService);
  user!: WritableSignal<User>;

  userName: FormControl = new FormControl("");
  userSurname: FormControl = new FormControl("");
  userPhoneNumber: FormControl = new FormControl("");
  displayPopUp = signal(false);

  constructor(private router: Router) {
  }

  ngOnInit() {
    let user = this.apiService.user();
    if (user) {
      this.user = signal(user);
    } else {
      this.backToHomePage();
    }
  }

  openPopUp() {
    this.displayPopUp.set(true);
    this.userName.setValue(this.user().name);
    this.userSurname.setValue(this.user().surname);
    this.userPhoneNumber.setValue(this.user().phoneNumber);
  }

  closePopUp() {
    this.displayPopUp.set(false);
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
    }).subscribe((user) => {
      this.user.set(user);
    });

    this.closePopUp();

    event.preventDefault();
  }
}
