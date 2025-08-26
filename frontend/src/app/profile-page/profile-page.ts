import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  imports: [NgStyle],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  displayPopUp = "none";

  openPopUp() {
    this.displayPopUp = "block";
  }

  closePopUp() {
    this.displayPopUp = "none";
  }

  backToHomePage() {
    this.router.navigate([''])
  }

  logout() {
    this.router.navigate(['home'])
  }
}
