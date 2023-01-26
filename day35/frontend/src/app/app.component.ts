import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'frontend';

  resultsPPArray = [1,2,3,4,5,6,7,8,9,10]
  resultsPP!: number
  form!: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createForm()
  }

  clearForm() {
    this.form = this.createForm()
  }

  newResultPP() {
    // console.log(this.form.value['resultsPP'])
    this.resultsPP = this.form.value['resultsPP']
  }

  private createForm(): FormGroup {
    return this.fb.group({
      resultsPP: this.fb.control<number>(10, [ Validators.required ])
    })
  }

}
