import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../interfaces/user';
import { SearchQuery } from '../interfaces/searchQuery';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { SearchQueryResult } from '../interfaces/searchQueryResult';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  apiRoute: string = 'http://localhost:8080/api';
  user: WritableSignal<User | null> = signal(null);

  constructor(private http: HttpClient) {
  }

  signIn(uid?: string) {
    let url = `${this.apiRoute}/signIn`;
    if (uid) {
      url += '/' + uid;
    }
    this.http.get<User>(url, { withCredentials: true }).subscribe((user) => {
      this.user.set(user);
    });
  }
  
  signUp(uid: string, user: User) {
    this.http.post(`${this.apiRoute}/signUp/${uid}`, user).subscribe((response) => {
      console.log(response);
    });
  }

  getProductCategories() : Observable<Array<string>> {
    return this.http.get<Array<string>>(`${this.apiRoute}/productCategories`);
  }

  searchQuery(query: SearchQuery) : Observable<SearchQueryResult> {
    return this.http.post<SearchQueryResult>(`${this.apiRoute}/search`, query);
  }
}
