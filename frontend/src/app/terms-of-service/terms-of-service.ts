import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-of-service',
  imports: [],
  templateUrl: './terms-of-service.html',
  styleUrl: './terms-of-service.css'
})
export class TermsOfService {

  constructor(private router: Router) {}

  backToHomePage() {
    this.router.navigate([''])
  }
}
