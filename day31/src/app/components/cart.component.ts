import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Inventory } from '../models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  @Input()
  cart: Inventory[] = []
  
  @Input()
  cartMap = new Map<string,number>()

  @Output()
  onRemove = new Subject<string>()

  removed(name: string) {
    console.info("cart comp > removing ", name)
    this.onRemove.next(name)
  }

}
