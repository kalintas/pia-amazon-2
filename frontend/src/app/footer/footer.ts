import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrivacyPolicy } from '../privacy-policy/privacy-policy';
import { TermsOfService } from '../terms-of-service/terms-of-service';
import { ContactUs } from '../contact-us/contact-us';

@Component({
  selector: 'app-footer',
  imports: [PrivacyPolicy, TermsOfService, ContactUs],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  constructor(private router: Router) {}

  toPrivacyPolicyPage() {
    this.router.navigate(['/privacy-policy'])
  }

  toTermsOfServicePage() {
    this.router.navigate(['/terms-of-service'])
  }

  toContactUsPage() {
    this.router.navigate(['/contact-us'])
  }
}
