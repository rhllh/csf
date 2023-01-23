import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MaterialModule } from '../material.module';
import { User } from '../models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  
  form!: FormGroup

  @Output() onNewUser = new Subject<User>()

  currentDate: String = new Date().toISOString().substring(0,10)

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log(new Date().toLocaleDateString())
    this.form = this.createForm()
  }

  processForm() {
    console.log(`user comp > submitting form ${this.form.value}`)
    this.onNewUser.next(this.value())
  }

  clearForm() {
    console.log(`user comp > clearing form`)
    this.form = this.createForm()
  }

  value(): User {
    return this.form.value as User
  }

  save() {

  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('', [ Validators.required, Validators.minLength(3) ]),
      email: this.fb.control<string>('', [ Validators.required, Validators.email ]),
      dob: this.fb.control<Date>(new Date(), [ Validators.required ])
    })
  }
}
