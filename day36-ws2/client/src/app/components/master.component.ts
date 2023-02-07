import { Component, OnInit, Output } from '@angular/core';
import { Game } from '../models';
import { BggService } from '../services/bgg.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  games: Game[] = []

  constructor(private svc: BggService) {}
  
  ngOnInit(): void {
    this.svc.getGames()
            .then(games => {
              this.games = games
              console.log(this.games)
            })
            .catch(error => console.log(error))
  }

}
