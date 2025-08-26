import { Component, computed, HostListener, inject, signal, ViewChild, WritableSignal } from '@angular/core';
import { ProductBox } from './product-box/product-box';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../interfaces/product';
import { Pagination } from "../pagination/pagination";
import { Cart } from '../cart/cart';
import { AuthPage } from '../auth-page/auth-page';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-service';
import { SearchQuery } from '../interfaces/searchQuery';

@Component({
    selector: 'app-home',
    imports: [ProductBox, CommonModule, FormsModule, Pagination, Header, Footer],
    templateUrl: './home.html',
    styleUrl: './home.css'
})
export class Home {
    auth: Auth = inject(Auth);
    apiService: ApiService = inject(ApiService);

    categoryOptions: WritableSignal<string[]> = signal([]);

    searchId: string = '';
    searchName: string = '';
    selectedCategory: string = '';

    searchResult: WritableSignal<Product[]> = signal([]);
    searchResultCount = signal(0);

    currentPage: number = 1;
    totalPages = computed(() => {
        return Math.ceil(this.searchResultCount() / this.maximumProductPerPage)
    });
    maximumProductPerPage: number;
    Math = Math;

    constructor(private router: Router) {
        this.maximumProductPerPage = window.innerWidth <= 600 ? 20 : 60;
    }

    ngOnInit() {
        this.apiService.getProductCategories().subscribe((categories) => {
            this.categoryOptions.set(categories);
        });
        this.onSearch();
    }

    onSearch() {

        const query: SearchQuery = {
            "id": this.searchId,
            "name": this.searchName,
            "category": this.selectedCategory,
            "page": this.currentPage,
            "productCount": this.maximumProductPerPage
        };

        this.apiService.searchQuery(query).subscribe((result) => {
            this.searchResult.set(result.products);
            this.searchResultCount.set(result.searchResultCount);
            console.log(result);
        });
    }

    onPageChange(page: number) {
        this.currentPage = page;
        this.onSearch();
        window.scrollTo(0, 0);
    }

    @HostListener("window:resize", [])
    onWindowResize() {
        this.maximumProductPerPage = window.innerWidth <= 600 ? 20 : 60;
    }

    cartItemCount: number = 0;
    @ViewChild(Cart) cartComponent!: Cart;
    @ViewChild(AuthPage) profileComponent!: AuthPage;

    togleCart() {
        this.cartComponent.open.set(!this.cartComponent.open());
    }
}
