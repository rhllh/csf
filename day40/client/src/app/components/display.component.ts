import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDetails } from '../models';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  posts: PostDetails[] = []

  constructor(private svc: UploadService) {}

  ngOnInit(): void {
    this.svc.getAllPosts()
        .then(result => {
          console.log(result)
          this.posts = result
        }).catch(error => console.log(error))
  }

}
