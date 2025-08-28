import { NgStyle } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-service';
import { Product } from '../interfaces/product';
import { Reel } from '../interfaces/reel';

@Component({
    selector: 'app-reels-page',
    imports: [NgStyle],
    templateUrl: './reels-page.html',
    styleUrl: './reels-page.css'
})
export class ReelsPage {

    apiService: ApiService = inject(ApiService)
    commentsEnabled = signal(false);

    reel: WritableSignal<Reel | null> = signal(null);
    product: WritableSignal<Product | null> = signal(null);

    constructor(private router: Router) { }

    ngOnInit() {
        this.fetchReel();
    }

    fetchReel() {
        this.apiService.getReel().subscribe((reel) => {
            this.apiService.getProduct(reel.productId).subscribe((product) => {
                this.product.set(product);
                console.log(product)
            })
            this.reel.set(reel);
        })
    }

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
}
