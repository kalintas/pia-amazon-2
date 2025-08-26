import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../services/api-service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateProfile implements CanActivate {

  apiService = inject(ApiService)

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (this.apiService.user()) {
      return true;
    } else {
      this.router.navigate(['/'])
      return false;
    }
  }

}
