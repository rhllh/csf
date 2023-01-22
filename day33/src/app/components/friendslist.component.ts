import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserDetail } from '../models';

@Component({
  selector: 'app-friendslist',
  templateUrl: './friendslist.component.html',
  styleUrls: ['./friendslist.component.css']
})
export class FriendslistComponent implements OnChanges {
  
  @Input()
  name: string = ""

  @Input()
  friends: UserDetail[] = []

  count = 0

  ngOnChanges(changes: SimpleChanges) {
    console.log(`changes > ${changes}`)
    this.count = changes['friends'].currentValue.length
  }
}
