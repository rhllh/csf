import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  param$!: Subscription
  charId!: number
  form!: FormGroup

  constructor(private fb: FormBuilder, private ar: ActivatedRoute, private marvelSvc: MarvelService, private router: Router) {}

  ngOnInit(): void {
    this.param$ = this.ar.params.subscribe(
      (params) => {
        this.charId = params['charId']
      }
    )

    this.form = this.createForm()
  }

  postComment() {
    const comment = this.form.value['comment']
    console.log(comment)

    // post comment
    this.marvelSvc.postComment(this.charId, comment)

    this.router.navigate([`/character/id/${this.charId}`])
  }

  private createForm(): FormGroup {
    return this.fb.group({
      comment: this.fb.control<string>('', [ Validators.required ])
    })
  }
}
