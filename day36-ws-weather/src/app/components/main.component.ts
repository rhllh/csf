import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  cities: string[] = [
    'singapore',
    'kuala lumpur',
    'tokyo',
    'bangkok',
    'sydney'
  ]

  citiesArr = {
    'cities': this.cities
  }

  form!: FormGroup

  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    if (sessionStorage.getItem('cities') != null)
      this.cities = JSON.parse(sessionStorage.getItem('cities') as string)['cities']
    
    this.form = this.fb.group({
      name: this.fb.control<string>('')
    })
  }

  addCity() {
    const city: string = this.form.value['name']
    if (!this.cities.includes(city)) {
      this.cities = [...this.cities, city.toLowerCase()]
      const citiesArr = {
        'cities': this.cities
      }
      sessionStorage.setItem('cities', JSON.stringify(citiesArr))
    }

  }

  deleteCity(index: number) {
    this.cities.splice(index,1)
    const citiesArr = {
      'cities': this.cities
    }
    sessionStorage.setItem('cities', JSON.stringify(citiesArr))
  }
  
}
