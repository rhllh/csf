import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Listing, PostingResult } from '../models';
import { ListingService } from '../services/listing.service';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-sell-form',
  templateUrl: './sell-form.component.html',
  styleUrls: ['./sell-form.component.css']
})
export class SellFormComponent {

  @ViewChild('image') image!: ElementRef

  form!: FormGroup
  listing!: Listing
  postingId!: string
  postingResult!: PostingResult

  constructor(private fb: FormBuilder, private svc: ListingService, 
              private router: Router, private shareSvc: SharingService) {}

  ngOnInit(): void {
    this.form = this.createForm()
  }

  processForm() {
    console.log("processing form")
    this.listing = this.form.value as Listing
    // console.log(this.listing)

    // call service to post listing
    this.svc.postListing(this.listing, this.image.nativeElement.files[0])
      .then(result => {
        this.postingResult = result

        // share json result
        this.shareSvc.sharingValue = this.postingResult;

        // navigate to before confirmation page
        this.router.navigate([`/post/${this.postingResult.postingId}`])
      }).catch(error => {
        console.log(error)
      })
  }

  clearForm() {
    console.log("clearing form")
    this.ngOnInit()
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('', [ Validators.required, Validators.minLength(3) ]),
      email: this.fb.control<string>('', [ Validators.required, Validators.email, Validators.maxLength(128) ]),
      phone: this.fb.control<number>,
      title: this.fb.control<string>('', [ Validators.required, Validators.minLength(5), Validators.maxLength(128)]),
      description: this.fb.control<string>('', [ Validators.required ]),
      image: this.fb.control<File>
    })
  }
}
