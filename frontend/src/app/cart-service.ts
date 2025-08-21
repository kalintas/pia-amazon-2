import { Injectable } from '@angular/core';
import { Product } from './product_database';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    private items: Product[] = [];
    getItems() {
        return this.items;
    }
    addToCart(product: Product) {
        this.items.push(product);
    }
}
