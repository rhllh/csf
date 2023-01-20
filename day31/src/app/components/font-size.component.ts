import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-font-size',
  templateUrl: './font-size.component.html',
  styleUrls: ['./font-size.component.css']
})
export class FontSizeComponent {
  @Input() message: string;
  @Output() onFontSize = new Subject<number>();

  fontSize = '1em';
  greetings = 'hello world';

  fontSizeChanged(event) {
    const fontSize = parseInt(event.target.value)
    this.fontSize = `${fontSize}em`
    this.onFontSize.next(fontSize)
  }
}
