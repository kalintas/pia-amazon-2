import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../interfaces/user';
import { SearchQuery } from '../interfaces/searchQuery';
import { Product } from '../interfaces/product';
import { observable, Observable, tap } from 'rxjs';
import { ProductQueryResult } from '../interfaces/productQueryResult';
import { Auth } from '@angular/fire/auth';
import { UpdateUserRequest } from '../interfaces/updateUserRequest';
import { SuggestionQuery } from '../interfaces/suggestionQuery';
import { Reel } from '../interfaces/reel';
import { ReelComment } from '../interfaces/reelComment';

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

  signIn(uid?: string) : Observable<User> {
    let url = `${this.apiRoute}/signIn`;
    if (uid) {
      url += '/' + uid;
    }
    const request = this.http.get<User>(url, { withCredentials: true }).pipe(
      tap((user) => {
        this.user.set(user)
      })
    );
    this.userObservable.set(request);
    return request;
  }
  
  signUp(user: User) : Observable<Object> {
    return this.http.post(`${this.apiRoute}/signUp`, user);
  }

  signOut() {
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

  getProduct(id: string) : Observable<Product> {
    return this.http.get<Product>(`${this.apiRoute}/product/${id}`);
  }

  searchQuery(query: SearchQuery) : Observable<ProductQueryResult> {
    return this.http.post<ProductQueryResult>(`${this.apiRoute}/search`, query);
  }

  getSuggestions(query: SuggestionQuery) : Observable<ProductQueryResult> {
    return this.http.post<ProductQueryResult>(`${this.apiRoute}/suggestions`, query, { withCredentials: true });
  }

  updateUser(user: UpdateUserRequest) : Observable<User> {
    return this.http.patch<User>(`${this.apiRoute}/updateUser`, user, { withCredentials: true }).pipe(
      tap((user) => {
        this.user.set(user)
      })
    );
  }

  getReel() : Observable<Reel> {
    return this.http.get<Reel>(`${this.apiRoute}/reel`);
  }
  getReelComments(reelId: string) : Observable<Array<ReelComment>> {
    return this.http.get<Array<ReelComment>>(`${this.apiRoute}/reel/comments/${reelId}`);
  }

}
