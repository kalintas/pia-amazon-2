import { Component, Input, signal, input, computed } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Pagination } from '../../pagination/pagination';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-suggestions',
    imports: [Pagination, CommonModule],
    templateUrl: './suggestions.html',
    styleUrl: './suggestions.css',
    standalone: true
})
export class Suggestions {
    product = input.required<Product>();

    swipeInterval!: number;
    ProductDatabase: Product[] = []

    constructor(public router: Router) {
        this.setSwipeInterval();
    }

    setSwipeInterval() {
        clearInterval(this.swipeInterval);
        this.swipeInterval = setInterval(() => {
            if (this.similar().length > 0) {
                const nextPage = this.currentPage() < this.totalPages() ? this.currentPage() + 1 : 1;
                this.currentPage.set(nextPage);
            }
        }, 10000);
    }

    currentPage = signal<number>(1);
    totalPages = computed(() => {
        const currentCategory = this.product().category;
        const sameCategory = this.ProductDatabase.filter(p => p.category === currentCategory && p.id !== this.product().id);
        return Math.ceil(sameCategory.length / this.maximumProductPerPage());
    });
    maximumProductPerPage = signal<number>(10);

    similar = computed(() => {
        const currentCategory = this.product().category;
        const sameCategory = this.ProductDatabase.filter(p => p.category === currentCategory && p.id !== this.product().id);
        const startIdx = (this.currentPage() - 1) * this.maximumProductPerPage();
        const endIdx = startIdx + this.maximumProductPerPage();
        return sameCategory.slice(startIdx, endIdx);
    })

    onPageChange(page: number) {
        this.currentPage.set(page);
        this.setSwipeInterval();
    }

    onProductClick(product: Product) {
        this.setSwipeInterval();
        this.currentPage.set(1);
        this.router.navigate(['/product', product.id]);
    }
}
