import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character } from '../models';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  characters!: Character[]
  offset: number = 0
  keyword!: string

  param$!: Subscription

  constructor(private ar: ActivatedRoute, private router: Router, private marvelSvc: MarvelService) {}
  
  ngOnInit(): void {
    this.param$ = this.ar.params.subscribe(
      (params) => {
        this.keyword = params['keyword']

        // retrieve characters
        this.marvelSvc.searchCharByStartsWith(this.keyword,this.offset)
          .then(result => {
            console.log(result)
            this.characters = result
          }).catch(error => {
            console.log(error)
          })
      }
    )
  }

  backButton() {
    this.offset -= 5
    // retrieve characters
    this.marvelSvc.searchCharByStartsWith(this.keyword,this.offset)
    .then(result => {
      console.log(result)
      this.characters = result
    }).catch(error => {
      console.log(error)
    })
  }

  nextButton() {
    this.offset += 5
    // retrieve characters
    this.marvelSvc.searchCharByStartsWith(this.keyword,this.offset)
    .then(result => {
      console.log(result)
      this.characters = result
    }).catch(error => {
      console.log(error)
    })
  }

}
