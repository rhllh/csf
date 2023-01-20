import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { INVENTORIES } from '../constant';
import { Inventory, Item } from '../model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  
  @Output() onAdd = new Subject<Item>()

  fruits: Inventory[] = INVENTORIES

  addItem(fruit: string) {
    console.log(`fruit to add > ${fruit}`)
    const item = {
      name: `${fruit}`
    } as Item
    this.onAdd.next(item)
  }
}
