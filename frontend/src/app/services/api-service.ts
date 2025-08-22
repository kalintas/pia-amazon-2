import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  apiRoute: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  signIn(uid: string) {
    this.http.get<User>(`${this.apiRoute}/signIn/${uid}`).subscribe((user) => {
      console.log(user);
    });
  }
  
  signUp(uid: string, user: User) {
    this.http.post(`${this.apiRoute}/signUp/${uid}`, user).subscribe((response) => {
      console.log(response);
    });
  }

}
