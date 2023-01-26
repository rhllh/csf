import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Games } from '../models';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games!: Games
  currentIndex: number = 0
  pageNo: number = 1

  @Input() resultsPerPage = 0

  constructor(private svc: GamesService) {}

  ngOnInit(): void {
    // console.log("games comp > ngOnInit")

    if (this.resultsPerPage == null)
      this.resultsPerPage = 10

    this.svc.getGames(this.resultsPerPage,this.currentIndex).subscribe((resp) => {
      // console.log(resp)
      this.games = resp
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['resultsPerPage'].currentValue == null)
      this.resultsPerPage = 10
    else
      this.resultsPerPage = changes['resultsPerPage'].currentValue

    // console.log(this.resultsPerPage)

    this.svc.getGames(this.resultsPerPage,this.currentIndex).subscribe((resp) => {
      // console.log(resp)
      this.games = resp
    })
  }

  prevPage() {
    this.pageNo--
    this.currentIndex = this.currentIndex - this.resultsPerPage
    this.svc.getGames(this.resultsPerPage, this.currentIndex).subscribe((resp) => {
      // console.log(resp)
      this.games = resp
    })
  }

  nextPage() {
    this.pageNo++
    this.currentIndex = this.currentIndex + this.resultsPerPage
    this.svc.getGames(this.resultsPerPage, this.currentIndex).subscribe((resp) => {
      // console.log(resp)
      this.games = resp
    })
  }

}
