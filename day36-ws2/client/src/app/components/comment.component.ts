import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BggService } from '../services/bgg.service';
import { Comment } from '../models';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  param$!: Subscription
  comments: Comment[] = []

  constructor(private ar: ActivatedRoute, private svc: BggService) {}

  ngOnInit(): void {
    this.param$ = this.ar.params.subscribe(
      (params) => {
        const gid = params['gid'] as number
        this.svc.getCommentsByGID(gid).then(
          results => {
            this.comments = results as unknown as Comment[]
            console.log(this.comments)
          }
        ).catch(error => console.log(error))
      }
    )
  }

  
}
