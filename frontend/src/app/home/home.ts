import { Component, HostListener, ViewChild } from '@angular/core';
import { ProductBox } from './product-box/product-box';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductDatabase } from '../product_database';
import { Pagination } from "../pagination/pagination";
import { Cart } from '../cart/cart';
import { ProfilePage } from '../profile-page/profile-page';
import { Header } from '../header/header';

@Component({
    selector: 'app-home',
    imports: [ProductBox, CommonModule, FormsModule, Pagination, Cart, ProfilePage, Header],
    templateUrl: './home.html',
    styleUrl: './home.css'
})
export class Home {
    categoryOptions: string[] = Array.from(new Set(ProductDatabase.map(p => p.category))).sort();;

    searchId: string = '';
    searchName: string = '';
    selectedCategory: string = '';

    searchResults: Product[] = [];
    productList: Product[] = [];

    currentPage: number = 1;
    totalPages: number;
    maximumProductPerPage: number;
    Math = Math;
    
    constructor() {
        this.maximumProductPerPage = window.innerWidth <= 600 ? 20 : 60;
        this.totalPages = Math.ceil(ProductDatabase.length / this.maximumProductPerPage);
    }

    ngOnInit() {
        this.onSearch();
    }

    onSearch() {
        this.searchResults = [];
        ProductDatabase.forEach((product) => {
            if ((this.searchId === "" || product.id.includes(this.searchId)) && (this.searchName === "" || product.name.toLowerCase().includes(this.searchName.toLowerCase()))
                && (this.selectedCategory === "" || this.selectedCategory === product.category)) {
                this.searchResults.push({
                    id: product.id,
                    name: product.name,
                    category: product.category,
                    description: product.description,
                    price: product.price,
                    imageurl: product.imageurl,
                });
            }
        });
        
        this.productList = [];
        for (let i = (this.currentPage - 1) * this.maximumProductPerPage; i < (this.currentPage * this.maximumProductPerPage) && i < this.searchResults.length; i++) {
            this.productList.push(this.searchResults[i]); 
        }
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
}
