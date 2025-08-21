import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    imports: [CommonModule],
    templateUrl: './pagination.html',
    styleUrl: './pagination.css'
})
export class Pagination {
    @Input() currentPage!: number;
    @Input() totalPages!: number;
    @Input() maxPagesToShow!: number;

    @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
        this.updateMaxPagesToShow();
    }

    updateMaxPagesToShow() {
        this.maxPagesToShow = window.innerWidth <= 1000 ? (window.innerWidth <= 600 ? 3 : 5) : 10;
    }

    pageRange() {
        let startPage;
        let endPage;
        if (this.totalPages <= this.maxPagesToShow) {
            // We can simply put every page number to the component.
            startPage = 1;
            endPage = this.totalPages;
        } else {
            const numMiddle = this.maxPagesToShow - 2; // slots between first and last
            let left = Math.max(2, this.currentPage - Math.floor(numMiddle / 2));
            let right = left + numMiddle - 1;
            if (right >= this.totalPages) {
                right = this.totalPages - 1;
                left = right - numMiddle + 1;
            }
            startPage = left;
            endPage = right;
        }
        
        return { startPage, endPage };
    }

    pageNumbers() {
        const { startPage, endPage } = this.pageRange();
        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }

    onPageChange(page: number) {
        this.currentPage = page;
        this.pageChange.emit(this.currentPage);
    }

    @HostListener("window:resize", [])
    onWindowResize() {
        this.updateMaxPagesToShow();
    }
}
