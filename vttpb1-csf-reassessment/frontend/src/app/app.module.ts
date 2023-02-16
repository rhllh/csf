import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SellFormComponent } from './components/sell-form.component';
import { AfterConfirmComponent } from './components/after-confirm.component';
import { BeforeConfirmComponent } from './components/before-confirm.component';
import { ListingService } from './services/listing.service';
import { SharingService } from './services/sharing.service';

const appRoutes: Routes = [
  { path: '', component: SellFormComponent },
  { path: 'post/:postingId', component: BeforeConfirmComponent },
  { path: 'confirm/:postingId', component: AfterConfirmComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    SellFormComponent,
    BeforeConfirmComponent,
    AfterConfirmComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [ListingService, SharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
