import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { INVENTORIES } from '../constants';
import { Inventory } from '../models';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {

  @Output()
  onAdd = new Subject<string>()

  inventories: Inventory[] = INVENTORIES

  added(imageUrl: string) {
    console.info("inventory comp > clicked ", imageUrl)
    this.onAdd.next(imageUrl)
  }
}
