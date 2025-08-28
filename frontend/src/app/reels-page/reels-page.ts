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

  like_number = 0;
  dislike_number = 0;
  comment_number = 0;

  increaseLike() {
    return this.like_number = this.like_number + 1;
  }

  increaseDislike() {
    return this.dislike_number = this.dislike_number + 1;
  }

  increaseComment() {
    this.comment_number = this.comment_number + 1;
  }

  backToHomePage() {
    this.router.navigate(['home'])
  }

  displayPopUp = "none";

  openPopUp() {
    this.displayPopUp = "flex";
  }

  closePopUp() {
    this.displayPopUp = "none";
  }
}
