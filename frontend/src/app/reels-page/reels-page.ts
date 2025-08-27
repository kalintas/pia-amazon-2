import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reels-page',
  imports: [NgStyle],
  templateUrl: './reels-page.html',
  styleUrl: './reels-page.css'
})
export class ReelsPage {

  constructor(private router: Router) {}

  backToHomePage() {
    this.router.navigate(['home'])
  }

  displayPopUp = "none";

  openPopUp() {
    this.displayPopUp = "block";
  }

  closePopUp() {
    this.displayPopUp = "none";
  }
}
