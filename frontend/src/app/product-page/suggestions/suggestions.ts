import { Component, Input, signal, input, computed, inject, WritableSignal } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Pagination } from '../../pagination/pagination';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service';

@Component({
    selector: 'app-suggestions',
    imports: [Pagination, CommonModule],
    templateUrl: './suggestions.html',
    styleUrl: './suggestions.css',
    standalone: true
})
export class Suggestions {

    apiService: ApiService = inject(ApiService);
    product = input.required<Product>();

    swipeInterval!: number;

    currentPage = signal<number>(1);
    
    totalSuggestionCount = signal<number>(0);
    maximumProductPerPage = signal<number>(10);

    totalPages = computed(() => {
        return Math.ceil(this.totalSuggestionCount() / this.maximumProductPerPage())
    });

    suggestions: WritableSignal<Array<Product>> = signal([]);

    constructor(public router: Router) {
    }
    
    ngOnInit() {
        this.setSwipeInterval();
        this.getSuggestions();
    }

    getSuggestions() {
        let query = {
            "productId": this.product().id,
            "page": this.currentPage(),
            "pageSize": this.maximumProductPerPage()
        };

        this.apiService.getSuggestions(query).subscribe((result) => {
            this.totalSuggestionCount.set(result.queryResultCount);
            this.suggestions.set(result.products);
        });
    }

    setSwipeInterval() {
        clearInterval(this.swipeInterval);
        this.swipeInterval = setInterval(() => {
            if (this.suggestions().length > 0) {
                const nextPage = this.currentPage() < this.totalPages() ? this.currentPage() + 1 : 1;
                this.currentPage.set(nextPage);
            }
        }, 10000);
    }

    onPageChange(page: number) {
        this.currentPage.set(page);
        this.setSwipeInterval();
        this.getSuggestions();
    }

    onProductClick(product: Product) {
        this.setSwipeInterval();
        this.currentPage.set(1);
        this.router.navigate(['/product', product.id]);
    }
}
