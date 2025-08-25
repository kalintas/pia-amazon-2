import { Component, signal} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  imports: [],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css'
})
export class EditProfile {

  constructor(private router: Router) {}

  backToProfilePage() {
    this.router.navigate(['/profile']);
  }
}
