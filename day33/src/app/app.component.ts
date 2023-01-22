import { Component, OnInit, ViewChild } from '@angular/core';
import { UserdetailComponent } from './components/userdetail.component';
import { UserDetail } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'day33';

  users: UserDetail[] = []
  newName!: string

  @ViewChild(UserdetailComponent)
  userDetail!: UserdetailComponent

  ngOnInit(): void {
    console.log(`app comp > ngOnInit > userDetail > ${this.userDetail}`)
  }

  ngAfterViewInit(): void {
    console.log()
  }

  process(userDetail: UserDetail) {
    console.log(`app comp > ${userDetail.name}`)
    this.newName = userDetail.name
    this.users = [ ...this.users, userDetail ]
  }

  deleteUser() {
    const user = this.userDetail.getFormValue()
    console.log(`deleting user ${user.name}`)
    this.users.forEach( u => {
      if (u.name === user.name) {
        var index = this.users.indexOf(u)
        this.users.splice(index, 1)
      }
    })
    this.users = [ ...this.users ]
  }

}
