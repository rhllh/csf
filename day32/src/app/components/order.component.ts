import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  form!: FormGroup
  lineItems!: FormArray
  order!: Order

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createForm()
  }

  processForm() {
    this.order = this.form.value as Order
    console.log(`name > ${this.order.name}, email > ${this.order.email}, rush > ${this.order.rush}, lineItems > ${this.order.lineItems}`)
  }

  addLineItem() {
    this.lineItems.push(this.createLineItem())
  }

  deleteLineItem(i: number) {
    this.lineItems.removeAt(i)
  }

  private createForm(): FormGroup {
    this.lineItems = this.fb.array([])
    return this.fb.group({
      name: this.fb.control<string>(''),
      email: this.fb.control<string>(''),
      rush: this.fb.control<boolean>(true),
      lineItems: this.lineItems
    })
  }

  private createLineItem(): FormGroup {
    return this.fb.group({
      item: this.fb.control<string>('', [ Validators.required ]),
      quantity: this.fb.control<number>(1, [ Validators.required, 
                                        Validators.min(1), Validators.max(100) ])
    })
  }

}
