import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of, Subscription } from 'rxjs';
import { ApiService } from '../services/api-service';
import { User } from '../interfaces/user';

@Component({
    selector: 'app-auth-page',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './auth-page.html',
    styleUrl: './auth-page.css',
})

export class AuthPage {

    pageSignIn = signal(true);
    errorString = signal('');

    private auth: Auth = inject(Auth);
    private apiService: ApiService = inject(ApiService);

    authState = authState(this.auth);
    authStateSubscription!: Subscription;

    userName: FormControl = new FormControl('');
    userSurname: FormControl = new FormControl('');
    userPhoneNumber: FormControl = new FormControl('');
    userEmail: FormControl = new FormControl('');
    userPassword: FormControl = new FormControl('');


    constructor(private router: Router) {
        effect(() => {
            this.pageSignIn();
            this.resetForm();
        })
    }

    backToHomePage() {
        this.router.navigate([''])
    }

    sendSignIn(uid: string) {
        if (!uid) {
            return;
        }
        this.apiService.signIn(uid).pipe(
            catchError(() => {
                this.auth.signOut(); // Sign out from firebase auth.
                this.errorString.set("Could not sign in.");
                return of();
            })
        ).subscribe((user) => {
            this.backToHomePage();
        });
    }

    onSignInWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(this.auth, provider).then((credential) => {
            const uid = credential.user.uid;
            this.sendSignIn(uid);
        }).catch((error) => {
            this.errorString.set(error.message);
        })
    }

    onSignIn() {
        signInWithEmailAndPassword(this.auth, this.userEmail.value, this.userPassword.value).then((credential) => {
            const uid = credential.user.uid;
            this.sendSignIn(uid);
        }).catch((error) => {
            this.errorString.set(error.message);
        })
    }

    onSignUp() {
        createUserWithEmailAndPassword(this.auth, this.userEmail.value, this.userPassword.value)
            .then((credential) => {
                const uid = credential.user.uid;
                if (uid) {
                    const user: User = {
                        uid,
                        name: this.userName.value,
                        surname: this.userSurname.value,
                        phoneNumber: this.userPhoneNumber.value,
                        email: this.userEmail.value
                    };

                    this.apiService.signUp(user).pipe(
                        catchError(() => {
                            this.auth.signOut(); // Sign out from firebase auth.
                            this.errorString.set("Could not sign up due to a server error.");
                            return of();
                        }))
                        .subscribe(() => {
                            this.errorString.set("");
                            this.pageSignIn.set(true);
                        });
                }
            }).catch((error) => {
                this.errorString.set(error.message);
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

    getAuthString() {
        return this.pageSignIn() ? "Sign In" : "Sign Up";
    }

    resetForm() {
        this.userName.setValue("");
        this.userSurname.setValue("");
        this.userPhoneNumber.setValue("");
        this.userEmail.setValue("");
        this.userPassword.setValue("");
    }
}
