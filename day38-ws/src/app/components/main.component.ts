import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CitiesRepository } from '../cities.repository';
import { City } from '../models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  cities: City[] = []

  // citiesArr = {
  //   'cities': this.cities
  // }

  form!: FormGroup

  constructor(private fb: FormBuilder, private citiesRepo: CitiesRepository) {}
  
  ngOnInit(): void {
    // if (sessionStorage.getItem('cities') != null)
    //   this.cities = JSON.parse(sessionStorage.getItem('cities') as string)['cities']

    // get list of cities from indexeddb
    this.citiesRepo.getCities()
      .then(result => {
        console.log(result)
        this.cities = result
      }).catch(error => {
        console.log(error)
      })
    
    this.form = this.fb.group({
      name: this.fb.control<string>('')
    })
  }

  addCity() {
    const city: string = this.form.value['name']

    const cityObj = { name: city } as City
    
    // if (!this.cities.includes(city)) {
    //   this.cities = [...this.cities, city.toLowerCase()]
    //   const citiesArr = {
    //     'cities': this.cities
    //   }
    //   sessionStorage.setItem('cities', JSON.stringify(citiesArr))
    // }

    this.citiesRepo.addCity(cityObj)

    this.ngOnInit()

  }

  deleteCity(index: number) {
    // this.cities.splice(index,1)
    // const citiesArr = {
    //   'cities': this.cities
    // }
    // sessionStorage.setItem('cities', JSON.stringify(citiesArr))

    this.citiesRepo.deleteCity(index)

    this.ngOnInit()
  }
}
