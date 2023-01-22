import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserdetailComponent } from './components/userdetail.component';
import { FriendslistComponent } from './components/friendslist.component';

@NgModule({
  declarations: [
    AppComponent,
    UserdetailComponent,
    FriendslistComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
