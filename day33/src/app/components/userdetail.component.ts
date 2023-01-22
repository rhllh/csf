import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserDetail } from '../models';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  @Output() onUserDetail = new Subject<UserDetail>()

  form!: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createForm()
  }

  getFormValue(): UserDetail {
    return this.form.value as UserDetail
  }

  processForm() {
    const userDetail: UserDetail = this.getFormValue()
    console.log(`user detail > ${userDetail.name}, ${userDetail.email}, ${userDetail.comments}`)
    this.onUserDetail.next(userDetail)
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('', [ Validators.required ]),
      email: this.fb.control<string>('', [ Validators.required, Validators.email ]),
      comments: this.fb.control<string>('')
    })
  }

}
