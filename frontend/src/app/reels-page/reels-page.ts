import { NgStyle } from '@angular/common';
import {
  Component,
  effect,
  HostListener,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-service';
import { Product } from '../interfaces/product';
import { Reel } from '../interfaces/reel';
import { ReelComment } from '../interfaces/reelComment';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reels-page',
  imports: [NgStyle, Header, Footer, NgStyle, ReactiveFormsModule],
  templateUrl: './reels-page.html',
  styleUrl: './reels-page.css',
})
export class ReelsPage {
  apiService: ApiService = inject(ApiService);
  commentsEnabled = signal(false);
  signInEnabled = signal(false);

  reelIds: Array<string> = [];
  currentReelIndex: WritableSignal<number> = signal(0);

  reel: WritableSignal<Reel | null> = signal(null);
  product: WritableSignal<Product | null> = signal(null);
    comments: WritableSignal<Array<ReelComment>> = signal([]);

  canSwipe = true;
  Array = Array;

  constructor(private router: Router) {
    effect(() => {
      const index = this.currentReelIndex();
      this.fetchReel(index);
    });

        effect(() => {
            const enabled = this.commentsEnabled();
            const reel = this.reel();
            if (enabled && reel) {
                this.fetchComments(reel.id);
            }
            this.canSwipe = !enabled;
        });
  }

  fetchReel(index: number) {
    this.canSwipe = false;
    let id = undefined;
    if (index < this.reelIds.length && this.reelIds[index]) {
      id = this.reelIds[index];
    }

        this.apiService.getReel(id).subscribe((reel: Reel) => {
            if (!reel) {
                return;
            }
            this.apiService
                .getProduct(reel.productId)
                .subscribe((product: Product) => {
                    this.product.set(product);
                    console.log(product);;
                });
            this.reel.set(reel);
            this.comments.set([]);
            if (index >= this.reelIds.length) {
                this.reelIds.push(reel.id);
            }
            this.canSwipe = true;
        });
    }

    fetchComments(reelId: string) {
        this.apiService.getReelComments(reelId).subscribe((comments) => {
            this.comments.set(comments);
        });
    }

  increaseLike() {}

  increaseDislike() {}

  increaseComment() {}

  backToHomePage() {
    this.router.navigate(['home']);
  }

  goToProductPage() {
    const product = this.product();
    if (product) {
      this.router.navigate(['product', product.id]);
    }
  }

  goToSignInPage() {
    this.router.navigate(['auth']);
  }

  // Either a negative or a positive number
  lastSwipe = 0;

  @HostListener('wheel', ['$event'])
  onSwipe(event: WheelEvent) {
    event.preventDefault();

    const THRESHOLD = 10;

    if (!this.canSwipe) {
      return;
    }

    if (
      Math.sign(this.lastSwipe) === Math.sign(event.deltaY) &&
      Math.abs(event.deltaY) > THRESHOLD
    ) {
      return;
    }

    if (event.deltaY > THRESHOLD) {
      // Get next reel.
      console.log('Next');
      this.currentReelIndex.update((index) => index + 1);
      this.lastSwipe = event.deltaY;
    } else if (event.deltaY < -THRESHOLD) {
      // Get prev reel.
      console.log('Prev');
      this.currentReelIndex.update((index) => Math.max(0, index - 1));
      this.lastSwipe = event.deltaY;
    } else {
      this.lastSwipe = 0;
    }
  }

  openSignInPopUp() {
    if (this.apiService.user() == null) {
      this.signInEnabled = signal(true);
    } else {
      this.signInEnabled = signal(false);
    }
  }
}
