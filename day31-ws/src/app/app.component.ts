import { Component, Input, Output } from '@angular/core';
import { INVENTORIES } from './constant';
import { Inventory, Item } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day31-ws';

  @Output()
  cart = new Map<string, number>()

  add(item: Item) {

    if (this.cart.has(item.name)) {
      const quantity = this.cart.get(item.name) as number
      this.cart.set(item.name, quantity+1)
    } else {
      this.cart.set(item.name, 1)
    }

    console.log(`added > ${item.name}, ${this.cart.get(item.name)}`)
  }

  remove(item: Item) {

    console.log(`to delete > ${item.name}`)

    const quantity = this.cart.get(item.name)

    if (quantity == 1) {
      this.cart.delete(item.name)
    } else {
      this.cart.set(item.name, quantity-1)
    }

    console.log(`deleted > ${item.name}`)
  }
}
