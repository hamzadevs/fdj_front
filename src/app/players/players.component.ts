import { Component, OnInit } from '@angular/core';
import { SoccerService } from '../soccer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Player } from '../player.interface';
import { Team } from '../team.interface';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: Player[];
  public showSearchBar: any=false;
  public team: Team;
  constructor(private soccerService: SoccerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.team = this.soccerService.getCurrentTeam();
    console.log(this.team)
    this.showSearchBar = this.soccerService.checkShowbarSearch();
    let team_id = this.route.snapshot.paramMap.get('id');
    this.soccerService.getPlayersTeam(team_id)
    .subscribe((response) => {
      this.players = response.results
      }
    )
  }
  
}
