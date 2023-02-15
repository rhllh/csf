import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  api_key: string = "51b2e49950e8a14614c5ac83f045b939"
  api_base_url: string = "https://api.openweathermap.org/data/2.5/weather?"

  constructor(private http: HttpClient) { }

  getWeatherByCity(city: string): Promise<any> {
    const params = new HttpParams()
                    .set('q', city)
                    .set('appid', this.api_key)

    return firstValueFrom(this.http.get(`${this.api_base_url}`, {params}))
  }
}
