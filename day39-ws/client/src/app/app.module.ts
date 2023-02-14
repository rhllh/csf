import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { SearchComponent } from './components/search.component';
import { DetailsComponent } from './components/details.component';
import { CommentComponent } from './components/comment.component';
import { MarvelService } from './services/marvel.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'characters/:keyword', component: SearchComponent },
  { path: 'character/id/:charId', component: DetailsComponent },
  { path: 'character/id/:charId/comment', component: CommentComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    DetailsComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MarvelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
