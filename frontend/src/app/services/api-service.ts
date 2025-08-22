import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(http: HttpClient) {
  }

  logIn(uid: string) {
  }

}
