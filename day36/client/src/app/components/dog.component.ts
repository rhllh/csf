import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})
export class DogComponent {

  constructor(private router: Router) {}

  process() {
    console.log('dog comp > process()')
    this.router.navigate(['/home'])
  }
}
