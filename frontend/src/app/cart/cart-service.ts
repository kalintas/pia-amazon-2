import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { Product } from '../interfaces/product';

export interface CartItem extends Product {
  quantity: number,
}


@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: WritableSignal<Array<CartItem>> = signal([]);
  total_price = computed(() => {
    let result = 0;
    this.items().forEach((item) => {
        result += item.price;
    })
    return result;
  })

  addToCart(product: Product) {
    this.items.update(list => {
      const existingItem = list.find(item => item.id === product.id);

      if (existingItem) {
        return list.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...list, { ...product, quantity: 1 }];
      }
    });
  }
  clearCart() {
    this.items.set([]);
  }
  removeItem(item: CartItem) {

  }
  checkout() {
  }
}
