import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character } from '../models';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  character!: Character
  param$!: Subscription
  charId!: number
  comments!: string[]

  constructor(private ar: ActivatedRoute, private router: Router, private marvelSvc: MarvelService) {}
  
  ngOnInit(): void {
    this.param$ = this.ar.params.subscribe(
      (params) => {
        this.charId = params['charId']

        this.marvelSvc.getCharacterDetailById(this.charId)
          .then(result => {
            console.log(result)
            this.character = result
          }).catch(error => {
            console.log(error)
          })
      }
    )
  }

  goToComment() {
    this.router.navigate([`/character/id/${this.charId}/comment`])
  }
}
