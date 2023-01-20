import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { INVENTORIES } from '../constant';
import { Inventory, Item } from '../model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  fruits: Inventory[] = INVENTORIES

  @Input()
  cart = new Map<string,number>()

  @Output()
  onRemove = new Subject<Item>()

  removed(name: string) {
    console.log(`in cart > ${name}`)
    const item = {
      name
    } as Item
    this.onRemove.next(item)
  }

}
