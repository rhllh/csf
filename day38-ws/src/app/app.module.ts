import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CityComponent } from './components/city.component';
import { MainComponent } from './components/main.component';
import { WeatherService } from './services/weather.service';
import { CitiesRepository } from './cities.repository';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'city/:name', component: CityComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [WeatherService, CitiesRepository],
  bootstrap: [AppComponent]
})
export class AppModule { }
