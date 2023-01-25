import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Weather } from '../models';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  
  form!: FormGroup
  city!: string

  OPEN_WEATHER_API_KEY = '51b2e49950e8a14614c5ac83f045b939'

  model = new Weather("Singapore", 0, 0, 0, "", 0, 0)

  constructor(
    private fb: FormBuilder, 
    private svc: WeatherService) 
    {

  }

  ngOnInit(): void {
    this.form = this.createForm()
  }

  searchWeather() {
    console.log(this.form.value["city"])
    this.city = this.form.value["city"]
    this.svc.getWeather(this.city, this.OPEN_WEATHER_API_KEY)
        .then((result) => {
          this.model = new Weather(
            this.city, result.main.temp, result.main.pressure, result.main.humidity,
            result.weather[0].description, result.wind.speed, result.wind.deg
          )
        })
  }

  clear() {
    this.form = this.createForm()
  }

  private createForm(): FormGroup {
    return this.fb.group({
      city: this.fb.control<string>('')
    })
  }
}
