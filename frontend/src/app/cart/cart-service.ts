import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { Product } from '../interfaces/product';

export interface CartItem extends Product {
  quantity: number,
}

interface Cart {
  [id: string]: CartItem;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: WritableSignal<Cart> = signal({});

  totalPrice = computed(() => {
    let result = 0;
    Object.values(this.items()).forEach((item) => {
      result += item.price * item.quantity;
    })
    return result;
  });

  addToCart(product: Product) {
    this.items.update(list => {
      if (list[product.id]) {
        list[product.id].quantity += 1;
      } else {
        list[product.id] = { ...product, quantity: 1 };
      }
      return {...list};
    });
  }
  clearCart() {
    this.items.set({});
  }
  removeItem(item: CartItem) {
    this.items.update((list) => {
      delete list[item.id];
      return {...list};
    })
  }
  checkout() {
  }

  getItems(): Array<CartItem> {
    return Object.values(this.items())
  }

  changeQuantity(item: CartItem, change: number) {
    this.items.update((list) => {
      list[item.id].quantity += change;
      if (list[item.id].quantity <= 0) {
        delete list[item.id];
      }
      return {...list};
    });
  }
}