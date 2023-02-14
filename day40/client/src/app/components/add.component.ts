import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadData } from '../models';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  form!: FormGroup
  uploadData!: UploadData

  @ViewChild('imageFile') imageFile!: ElementRef

  constructor(private fb: FormBuilder, private svc: UploadService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  uploadPost() {
    console.log("uploading post")

    this.uploadData = this.form.value as UploadData

    this.svc.uploadPost(this.uploadData, this.imageFile.nativeElement.files[0])
      .then(result => {
        console.log(result)
      }).catch(error => console.log(error))

    this.router.navigate(['/'])
  }

  private createForm(): FormGroup {
    return this.fb.group({
      image: this.fb.control<File>,
      title: this.fb.control<string>('', [ Validators.required ]),
      text: this.fb.control<string>('', [ Validators.required ])
    })
  }


}
