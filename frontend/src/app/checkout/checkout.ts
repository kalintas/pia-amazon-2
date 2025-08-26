import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {

  constructor(private router: Router) {}

  checkoutName: FormControl = new FormControl('');
  checkoutCardNumber: FormControl = new FormControl('');
  checkoutExpirationDate: FormControl = new FormControl('');
  checkoutCvv: FormControl = new FormControl('');
  
  backToHomePage() {
    this.router.navigate(['/'])
  }
}
