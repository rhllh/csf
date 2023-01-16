import { Component } from '@angular/core';
import { INVENTORIES } from './constants';
import { Inventory } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day31'
  
  // content: Inventory[] = []

  cartMap = new Map<string,number>()

  selected(inventory: string) {
    console.info("app comp > selected ", inventory)

    // get the fruit name and add to array
    const inv = INVENTORIES.filter(v => v.imageUrl == inventory)
    if (this.cartMap.has(inv[0].name)) {
      const quantity = this.cartMap.get(inv[0].name) as number
      this.cartMap.set(inv[0].name, quantity+1)
    } else {
      this.cartMap.set(inv[0].name, 1)
    }
    // this.content.push(inv[0])
  }

  removed(name: string) {
    console.info("app comp > removing ", name)
    
    const quantity = this.cartMap.get(name) as number
    if (quantity == 1)
      this.cartMap.delete(name)
    else
      this.cartMap.set(name, quantity-1)
  }
}
