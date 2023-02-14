import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form!: FormGroup

  constructor(private fb: FormBuilder, private router: Router, 
        private marvelSvc: MarvelService) {}

  ngOnInit(): void {
    this.form = this.createForm()
  }

  processSearch() {
    const keyword: string = this.form.value['keyword']
    console.log("searching.. ", keyword)

    // route to search page
    this.router.navigate([`/characters/${keyword}`])

  }

  private createForm(): FormGroup {
    return this.fb.group({
      keyword: this.fb.control<string>('', [ Validators.required ])
    })
  }
  
}
