import { Injectable, effect, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../services/api-service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActivateProfile implements CanActivate {

  apiService = inject(ApiService);

  constructor(private router: Router) {
  }

  canActivate(): Observable<boolean> {
    if (this.apiService.user() !== null) {
      return of(true);
    }
    const userObservable = this.apiService.userObservable();
    if (!userObservable) {
      this.router.navigate(['/']);
      return of(false);
    }
    return userObservable.pipe(
      map(() => {
        return true;
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }

}
