import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListingService } from '../services/listing.service';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-after-confirm',
  templateUrl: './after-confirm.component.html',
  styleUrls: ['./after-confirm.component.css']
})
export class AfterConfirmComponent implements OnInit {

  param$!: Subscription
  postingId!: string

  constructor(private ar: ActivatedRoute, private shareSvc: SharingService, 
              private svc: ListingService) {}

  ngOnInit(): void {
    this.param$ = this.ar.params.subscribe(
      (params) => {
        this.postingId = params['postingId']
      }
    )
  }

  
}
