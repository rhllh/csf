import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { WeatherResult } from '../models';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit{

  title!: string
  model: WeatherResult = new WeatherResult("","",0,0,0,0)

  constructor(private ar: ActivatedRoute, private svc: WeatherService) {}

  ngOnInit(): void {
    const name: string = this.ar.snapshot.params['name']
    this.title = name
    this.svc.getWeatherByCity(name)
      .then(result => {
        console.log(result)
        this.model = new WeatherResult(
          name, result.weather[0].description, 
          result.main.temp, result.main.feels_like, 
          result.main.temp_min, result.main.temp_max
        )
      }).catch(error => {
        console.log(error)
      })
  }

  
}
