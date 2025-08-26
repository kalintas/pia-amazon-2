import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../interfaces/user';
import { SearchQuery } from '../interfaces/searchQuery';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { SearchQueryResult } from '../interfaces/searchQueryResult';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  auth: Auth = inject(Auth);

  apiRoute: string = 'http://localhost:8080/api';
  user: WritableSignal<User | null> = signal(null);
  userObservable: WritableSignal<Observable<User> | null> = signal(null);
  
  constructor(private http: HttpClient) {
  }

  signIn(uid?: string) {
    let url = `${this.apiRoute}/signIn`;
    if (uid) {
      url += '/' + uid;
    }
    this.userObservable.set(this.http.get<User>(url, { withCredentials: true }));
    this.userObservable()?.subscribe((user) => {
      this.user.set(user);
    });
  }
  
  signUp(user: User) {
    this.http.post(`${this.apiRoute}/signUp`, user).subscribe((response) => {
      console.log(response);
    });
  }

  signOut(uid: string) {
    this.http.post(`${this.apiRoute}/signOut`, null, { withCredentials: true }).subscribe(() => {
      this.auth.signOut().then(() => {
        this.user.set(null);
        this.userObservable.set(null);
      });
    });
  }

  getProductCategories() : Observable<Array<string>> {
    return this.http.get<Array<string>>(`${this.apiRoute}/productCategories`);
  }

  searchQuery(query: SearchQuery) : Observable<SearchQueryResult> {
    return this.http.post<SearchQueryResult>(`${this.apiRoute}/search`, query);
  }
}
