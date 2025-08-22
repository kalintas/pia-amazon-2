import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  imports: [],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css'
})
export class ContactUs {
  constructor(private router: Router) {}

  backToHomePage() {
    this.router.navigate(['']);
  }
}
