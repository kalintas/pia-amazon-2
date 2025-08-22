import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.css',
})

export class AuthPage {

  pageSignIn = signal(true);

  private auth: Auth = inject(Auth);
  authState = authState(this.auth);
  authStateSubscription!: Subscription;

  userName: FormControl = new FormControl('');
  userSurname: FormControl = new FormControl('');
  userPhoneNumber: FormControl = new FormControl('');

  userEmail: FormControl = new FormControl('');
  userPassword: FormControl = new FormControl('');


  constructor(private router: Router) {
  }

  backToHomePage() {
    this.router.navigate([''])
  }

  onSignIn() {
    signInWithEmailAndPassword(this.auth, this.userEmail.value, this.userPassword.value).then((credential) => {
      const uid = credential.user.uid;

      this.backToHomePage();
    }).catch((error) => {
      console.error(error);
    })
  } 

  onSignUp() {
    createUserWithEmailAndPassword(this.auth, this.userEmail.value, this.userPassword.value)
    .then((credential) => {
      console.log(credential);
    }).catch((error) => {
      console.error(error);
    });
  }

  onAuth(event: SubmitEvent) {
    if (this.pageSignIn()) {
      this.onSignIn();
    } else {
      this.onSignUp();
    }
    event.preventDefault();
  }

}
