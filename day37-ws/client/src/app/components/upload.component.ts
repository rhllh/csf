import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetImageResult, GetPostResult } from '../models';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  postResult!: GetPostResult
  image!: GetImageResult

  param$!: Subscription

  constructor(private http: HttpClient, private svc: PostService, private ar: ActivatedRoute) {}

  ngOnInit(): void {
    this.param$ = this.ar.params.subscribe(
      (params) => {
        const postId = params['postId']

        // retrieve post
        this.svc.retrievePostFromFeed(postId)
          .then(result => {
            console.log(result)
            this.postResult = result
          }).catch(error => {
            console.log("error > ", error)
          })

        // retrieve image
        this.svc.retrieveImageFromFeed(postId)
          .then(result => {
            console.log(result)
            this.image = result
          }).catch(error => {
            console.log("error > ", error)
          })

      })
    
  }

}
