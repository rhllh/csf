import { Component, OnInit, ViewChild } from '@angular/core';
import { UserComponent } from './components/user.component';
import { User } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'day33-mat';

  @ViewChild(UserComponent)
  userComponent!: UserComponent

  users: User[] = []
  canSave = false

  ngOnInit(): void {
    this.canSave = !!navigator.share
    console.log(`app comp > canSave : ${this.canSave}`)
  }

  ngAfterViewInit(): void {

  }

  newUser(user: User) {
    console.log(`app comp > user: ${user.name}, ${user.email}, ${user.dob}`)
    this.users = [ ...this.users, user ]
  }

  save() {
    const user = this.userComponent.value()
    console.log(`app comp > save > ${user.dob}`)
    navigator.share({
      title: user.name,
      text: `Email: ${user.email}, DOB: ${user.dob}`
    })
    .then(result => {
      console.log(`result > ${result}`)
    })
    .catch(err => {
      console.error(`share error > ${err}`)
    })
  }

  clearForm() {
    console.log(`app comp > clearing form`)
    this.userComponent.clearForm()
  }
}
