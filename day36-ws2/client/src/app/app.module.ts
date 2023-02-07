import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MasterComponent } from './components/master.component';
import { CommentComponent } from './components/comment.component';
import { BggService } from './services/bgg.service';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    component: MasterComponent
  },
  {
    path: 'api/game/:gid/comments',
    component: CommentComponent
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [BggService],
  bootstrap: [AppComponent]
})
export class AppModule { }
