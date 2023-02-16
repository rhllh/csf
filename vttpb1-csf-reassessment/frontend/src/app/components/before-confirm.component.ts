import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostingResult } from '../models';
import { ListingService } from '../services/listing.service';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-before-confirm',
  templateUrl: './before-confirm.component.html',
  styleUrls: ['./before-confirm.component.css']
})
export class BeforeConfirmComponent implements OnInit {

  param$!: Subscription
  postingId!: string
  postingResult!: PostingResult

  constructor(private ar: ActivatedRoute, private router: Router,
              private svc: ListingService, private shareSvc: SharingService) {}

  ngOnInit(): void {
    this.param$ = this.ar.params.subscribe(
      (params) => {
        this.postingId = params['postingId']

        // retrieve listing from sharing service
        this.postingResult = this.shareSvc.sharingValue
        // console.log(this.postingResult)
      }
    )
  }
  
  confirmListing() {
    console.log("confirm button clicked")

    // send put request via service
    this.svc.confirmListing(this.postingId, this.postingResult)
      .then(result => {
        // console.log(result)

        // navigate to after-confirm if status ok
        this.router.navigate(['/confirm', this.postingId])
      }).catch(error => {
        console.log(error)
        alert(error['error']['message'])
      })
  }

    
}
